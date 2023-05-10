const { gql } = require("apollo-server-express");
const { DateTime, DateTimeResolver } = require("graphql-scalars");
const axios = require("axios");
const jwt = require("jsonwebtoken");
const { getGmailEmails } = require("./get-google-data/getGmailEmails");
require("dotenv").config();

const typeDefs = gql`
  scalar DateTime

  enum UserRole {
    ADMIN
    USER
  }

  type Query {
    companyApplications: [CompanyApplication]!
    loggedInUser: User
    getWeeklyStats: WeeklyStats!
  }

  type Mutation {
    authenticateWithGoogle(input: GoogleAuthInput!): GoogleAuthResponse!
    addSingleCompanyApplication(
      input: CompanyApplicationInput!
    ): CompanyApplication!
    deleteCompanyApplications(
      input: DeleteCompanyApplicationsInput!
    ): DeleteCompanyApplicationsResponse!
    importCompanyApplications: ImportCompanyApplicationsResponse!
    logOutUser: LogOutUserResponse!
  }

  type User {
    id: ID!
    name: String!
    email: String!
    lastLoggedIn: DateTime
    role: UserRole
    companyApplications: [CompanyApplication]
  }

  input GoogleAuthInput {
    accessToken: String!
  }

  type GoogleAuthResponse {
    status: Int!
    message: String!
  }

  type DeleteCompanyApplicationsResponse {
    status: Int!
    message: String!
  }

  type ImportCompanyApplicationsResponse {
    status: Int!
    message: String!
  }

  type LogOutUserResponse {
    status: Int!
    message: String!
  }

  type CompanyApplication {
    id: ID!
    externalId: ID
    companyName: String!
    position: String!
    awaitingResponse: Boolean
    rejected: Boolean
    nextRound: Boolean
    receivedOffer: Boolean
    notes: String
    appliedAt: DateTime!
    createdAt: DateTime!
    updatedAt: DateTime!
    unableToClassify: Boolean
    user: User!
  }

  type WeeklyStats {
    thisWeek: Stats!
    lastWeek: Stats!
  }

  type Stats {
    applicationCount: Int!
    responseCount: Int!
    nextRoundCount: Int!
    rejectionCount: Int!
  }

  input GetUserInput {
    name: String!
    email: String!
    role: UserRole
    companyApplications: [CompanyApplicationInput]
  }

  input DeleteCompanyApplicationsInput {
    ids: [String!]!
  }

  input CompanyApplicationInput {
    externalId: Int
    companyName: String!
    position: String!
    awaitingResponse: Boolean
    rejected: Boolean
    nextRound: Boolean
    receivedOffer: Boolean
    notes: String
    appliedAt: DateTime!
    unableToClassify: Boolean
  }
`;

function getWeekNumber(date) {
  const d = new Date(
    Date.UTC(date.getFullYear(), date.getMonth(), date.getDate())
  );
  const dayNum = d.getUTCDay() || 7;
  d.setUTCDate(d.getUTCDate() + 4 - dayNum);
  const yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1));
  return Math.ceil(((d - yearStart) / 86400000 + 1) / 7);
}

function filterItemsThisWeek(items) {
  const currentDate = new Date();
  const currentWeekNumber = getWeekNumber(currentDate);
  const currentYear = currentDate.getFullYear();

  return items.filter((item) => {
    const itemDate = new Date(item.appliedAt);
    return (
      getWeekNumber(itemDate) === currentWeekNumber &&
      itemDate.getFullYear() === currentYear
    );
  });
}

function filterItemsLastWeek(items) {
  const currentDate = new Date();
  const currentWeekNumber = getWeekNumber(currentDate);
  const previousWeekNumber =
    currentWeekNumber === 1 ? 52 : currentWeekNumber - 1;
  const currentYear = currentDate.getFullYear();
  const previousYear = currentWeekNumber === 1 ? currentYear - 1 : currentYear;

  return items.filter((item) => {
    const itemDate = new Date(item.date);
    const itemWeekNumber = getWeekNumber(itemDate);
    const itemYear = itemDate.getFullYear();

    return itemWeekNumber === previousWeekNumber && itemYear === previousYear;
  });
}

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
    deleteCompanyApplications: async (_, { input }, { prisma, jwtDecoded }) => {
      const companyApplications = await Promise.all(
        input.ids.map(async (id, index) => {
          await new Promise((resolve) => setTimeout(resolve, index * 500));
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
      const emails = await getGmailEmails(accessToken);

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
      await Promise.all(
        emails.map(async (companyApplication, index) => {
          await new Promise((resolve) => setTimeout(resolve, index * 500));
          return await prisma.companyApplication.create({
            data: {
              ...companyApplication,
              user: {
                connect: { id: jwtDecoded.id },
              },
            },
          });
        })
      );
      return {
        status: 200,
        message: "Successfully Imported New Company Applications",
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

module.exports = { typeDefs, resolvers };
