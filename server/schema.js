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
    acceptedOffer: Boolean
    notes: String
    appliedAt: DateTime!
    createdAt: DateTime!
    updatedAt: DateTime!
    unableToClassify: Boolean
    user: User!
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
    id: Int
    externalId: Int
    companyName: String!
    position: String!
    awaitingResponse: Boolean
    rejected: Boolean
    nextRound: Boolean
    receivedOffer: Boolean
    acceptedOffer: Boolean
    notes: String
    appliedAt: DateTime!
    unableToClassify: Boolean
  }
`;

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
    addSingleCompanyApplication: async (_, { input }, { prisma }) => {
      const newCompanyApplication = await prisma.companyApplication.create({
        data: { ...input },
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
