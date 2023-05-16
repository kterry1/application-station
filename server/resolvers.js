const { gql } = require("apollo-server-express");
const { DateTime, DateTimeResolver } = require("graphql-scalars");
const axios = require("axios");
const jwt = require("jsonwebtoken");
const { PubSub } = require("graphql-subscriptions");
const { getEmails } = require("./get-google-data/getEmails");
const { filterItemsThisWeek, filterItemsLastWeek } = require("./utils");
require("dotenv").config();

const pubsub = new PubSub();

const resolvers = {
  DateTime: DateTimeResolver,
  Query: {
    loggedInUser: async (_, __, { jwtDecoded, prisma }) => {
      if (jwtDecoded) {
        const user = await prisma.user.findUnique({
          where: { id: jwtDecoded.id },
        });
        return user;
      }
      return null;
    },
    companyApplications: async (_, __, { prisma, jwtDecoded }) => {
      const companyApplications = await prisma.companyApplication.findMany({
        where: {
          userId: jwtDecoded.id,
        },
      });
      return companyApplications;
    },
    getWeeklyStats: async (_, __, { prisma, jwtDecoded }) => {
      const companyApplications = await prisma.companyApplication.findMany({
        where: {
          userId: jwtDecoded.id,
        },
      });
      const filteredThisWeekCompanyApplications =
        filterItemsThisWeek(companyApplications);
      const filteredLastWeekCompanyApplications =
        filterItemsLastWeek(companyApplications);
      const applicationCountTW = filteredThisWeekCompanyApplications.length;
      const responseCountTW = filteredThisWeekCompanyApplications.filter(
        (companyApplication) => companyApplication.awaitingReponse === false
      ).length;
      const nextRoundCountTW = filteredThisWeekCompanyApplications.filter(
        (companyApplication) => companyApplication.nextRound === true
      ).length;
      const rejectionCountTW = filteredThisWeekCompanyApplications.filter(
        (companyApplication) => companyApplication.rejected === true
      ).length;
      const applicationCountLW = filteredLastWeekCompanyApplications.length;
      const responseCountLW = filteredLastWeekCompanyApplications.filter(
        (companyApplication) => companyApplication.awaitingReponse === false
      ).length;
      const nextRoundCountLW = filteredLastWeekCompanyApplications.filter(
        (companyApplication) => companyApplication.nextRound === true
      ).length;
      const rejectionCountLW = filteredLastWeekCompanyApplications.filter(
        (companyApplication) => companyApplication.rejected === true
      ).length;

      return {
        thisWeek: {
          applicationCount: applicationCountTW,
          responseCount: responseCountTW,
          nextRoundCount: nextRoundCountTW,
          rejectionCount: rejectionCountTW,
        },
        lastWeek: {
          applicationCount: applicationCountLW,
          responseCount: responseCountLW,
          nextRoundCount: nextRoundCountLW,
          rejectionCount: rejectionCountLW,
        },
      };
    },
  },
  Mutation: {
    authenticateWithGoogle: async (_, { input }, { prisma, res }) => {
      const createSignedToken = (user) => {
        return jwt.sign(
          { id: user.id, email: user.email },
          process.env.JWT_SECRET,
          {
            expiresIn: "1h",
          }
        );
      };

      // @TODO: Validate the accessToken first before running it through googleapi

      const userInfo = await axios
        .get(
          `https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=${input.accessToken}`
        )
        .then((response) => {
          return response;
        })
        .catch((error) => {
          console.log("Error authenticating user", error);
        });

      res.cookie("access_token", input.accessToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production", // Set 'secure' flag in production environment
        maxAge: 60 * 60 * 1000,
      });

      const signedToken = async (userInfo) => {
        try {
          const user = await prisma.user.findUnique({
            where: {
              email: userInfo.data.email,
            },
          });

          if (!user) {
            const newUser = await prisma.user.create({
              data: {
                email: userInfo.data.email,
                name: userInfo.data.name,
              },
            });

            return createSignedToken(newUser);
          }

          return createSignedToken(user);
        } catch (error) {
          console.error("Error with Prisma:", error);
        }
      };

      const getSignedToken = await signedToken(userInfo);

      res.cookie("jwt", getSignedToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production", // Set 'secure' flag in production environment
        maxAge: 60 * 60 * 1000,
      });
      return { status: 200, message: "Authorization Successful" };
    },
    addSingleCompanyApplication: async (
      _,
      { input },
      { prisma, jwtDecoded }
    ) => {
      const newCompanyApplication = await prisma.companyApplication.create({
        data: {
          ...input,
          user: {
            connect: { id: jwtDecoded.id },
          },
        },
      });
      return newCompanyApplication;
    },
    updateSingleCompanyApplication: async (
      _,
      { input },
      { prisma, jwtDecoded }
    ) => {
      if (jwtDecoded.id) {
        const { id, ...restInputFields } = input;
        const updatedCompanyApplication =
          await prisma.companyApplication.update({
            where: {
              id: parseInt(id),
            },
            data: {
              ...restInputFields,
            },
          });
        return updatedCompanyApplication;
      } else {
        console.error("You are not logged in to make these updates");
      }
    },
    deleteCompanyApplications: async (_, { input }, { prisma, jwtDecoded }) => {
      const companyApplications = await Promise.all(
        input.ids.map(async (id, index) => {
          await new Promise((resolve) => setTimeout(resolve, index * 400));
          const foundCompanyApplcation =
            await prisma.companyApplication.findUnique({
              where: {
                id: parseInt(id),
              },
            });
          if (
            foundCompanyApplcation &&
            foundCompanyApplcation.userId === jwtDecoded.id
          ) {
            return await prisma.companyApplication.delete({
              where: {
                id: await foundCompanyApplcation.id,
              },
            });
          }
        })
      );
      const count = await companyApplications.length;
      return {
        status: 200,
        message: `Successfully Deleted ${count} Company Application(s)`,
      };
    },
    importCompanyApplications: async (
      _,
      __,
      { prisma, jwtDecoded, accessToken }
    ) => {
      pubsub.publish("APPLICATION_IMPORTED", {
        importProgress: 0,
      });
      const emails = await getEmails(accessToken);

      // 'createMany' is not supported with SQLite
      // const newCompanyApplications = await prisma.companyApplication.createMany(
      //   {
      //     data: input.map((companyApplication) => ({
      //       ...companyApplication,
      //     })),
      //     user: {
      //       connect: { id: userId },
      //     },
      //   }
      // );
      let numOfImportedApplications = 0;
      let unableToClassifyCount = 0;
      const totalEmails = emails?.length;

      await Promise.all(
        emails?.map(async (companyApplication, index) => {
          await new Promise((resolve) => setTimeout(resolve, index * 400));
          const checkForDulicates = await prisma.companyApplication.findUnique({
            where: {
              externalId: companyApplication.externalId,
            },
          });
          if (!checkForDulicates) {
            await new Promise((resolve) => setTimeout(resolve, index * 400));
            const importedApplication = await prisma.companyApplication.create({
              data: {
                ...companyApplication,
                user: {
                  connect: { id: jwtDecoded.id },
                },
              },
            });
            if (importedApplication.unableToClassify === true) {
              unableToClassifyCount++;
            }
          }
          numOfImportedApplications++;
          let importProgress = Math.round(
            (numOfImportedApplications / totalEmails) * 100
          );

          pubsub.publish("APPLICATION_IMPORTED", {
            importProgress: importProgress,
          });
        })
      );
      return {
        status: 200,
        message: "Successfully Imported New Company Applications",
        unableToClassifyCount: unableToClassifyCount,
      };
    },
    logOutUser: async (_, __, { res, accessToken }) => {
      try {
        const response = await axios.post(
          "https://oauth2.googleapis.com/revoke",
          null,
          {
            headers: {
              "Content-Type": "application/x-www-form-urlencoded",
            },
            params: {
              token: accessToken,
            },
          }
        );

        if (response.status === 200) {
          res.cookie("jwt", "", {
            httpOnly: true,
            expires: new Date(0),
          });
          res.cookie("access_token", "", {
            httpOnly: true,
            expires: new Date(0),
          });
          return { status: 200, message: "Log Out Successful" };
        } else {
          console.error("Failed to revoke access token:", response.statusText);
        }
      } catch (error) {
        console.error("Error revoking access token:", error.message);
      }
    },
  },
  Subscription: {
    importProgress: {
      subscribe: () => pubsub.asyncIterator(["APPLICATION_IMPORTED"]),
    },
  },
  User: {
    companyApplications: async (parent, _, { prisma }) => {
      const companyApplications = await prisma.companyApplication.findMany({
        where: {
          userId: parent.id,
        },
      });
      return companyApplications;
    },
  },
  CompanyApplication: {
    user: async (parent, _, { prisma }) => {
      const user = await prisma.user.findUnique({
        where: {
          id: parent.userId,
        },
      });
      return user;
    },
  },
};

module.exports = { resolvers };
