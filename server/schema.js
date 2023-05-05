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
  }

  type Mutation {
    authenticateWithGoogle(input: GoogleAuthInput!): GoogleAuthResponse!
    addSingleCompanyApplication(
      input: CompanyApplicationInput!
    ): CompanyApplication!
    importCompanyApplications: ImportCompanyApplicationsResponse!
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
    responseMessage: String!
  }

  type ImportCompanyApplicationsResponse {
    responseMessage: String!
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
          console.log(error);
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
      return { responseMessage: "Authorization Successful" };
    },
    addSingleCompanyApplication: async (_, { input }, { prisma, req }) => {
      const newCompanyApplication = await prisma.companyApplication.create({
        data: { ...input },
      });
      return newCompanyApplication;
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
      const newCompanyApplications = await Promise.all(
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
        responseMessage: "Successfully Imported New Company Applications",
      };
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
