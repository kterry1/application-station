const { gql } = require("apollo-server-express");
const { DateTime, DateTimeResolver } = require("graphql-scalars");
const axios = require("axios");
const jwt = require("jsonwebtoken");
const { getEmails } = require("./gmail-api-test-server/server");
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
    authenticateWithGoogle(
      input: AuthenticateWithGoogleInput!
    ): AuthenticateWithGoogle!
    addSingleCompanyApplication(
      input: CompanyApplicationInput!
    ): CompanyApplication!
    # importMultipleCompanyApplications(
    #   input: [CompanyApplicationInput]!
    # ): [CompanyApplication]!
    importMultipleCompanyApplications(
      input: AuthenticateWithGoogleInput!
    ): String
  }

  type User {
    id: ID!
    name: String!
    email: String!
    lastLoggedIn: DateTime
    role: UserRole
    companyApplications: [CompanyApplication]
  }

  input AuthenticateWithGoogleInput {
    accessToken: String!
  }

  type AuthenticateWithGoogle {
    jwt: String!
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
    companyApplications: async (_, __, { prisma, jwtEncoded }) => {
      const jwtDecoded = jwt.verify(jwtEncoded, process.env.JWT_SECRET);

      const companyApplications = await prisma.companyApplication.findMany({
        where: {
          userId: jwtDecoded.id,
        },
      });
      return companyApplications;
    },
  },
  Mutation: {
    authenticateWithGoogle: async (_, { input }, { prisma }) => {
      const createToken = (user) => {
        return jwt.sign(
          { id: user.id, email: user.email },
          process.env.JWT_SECRET,
          {
            expiresIn: "1h",
          }
        );
      };
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
        return { jwt: createToken(newUser) };
      }
      return { jwt: createToken(user) };
    },
    addSingleCompanyApplication: async (_, { input }, { prisma, req }) => {
      const newCompanyApplication = await prisma.companyApplication.create({
        data: { ...input },
      });
      return newCompanyApplication;
    },
    importMultipleCompanyApplications: async (
      _,
      { input },
      { prisma, jwtEncoded }
    ) => {
      jwtDecoded = jwt.verify(jwtEncoded, process.env.JWT_SECRET);
      // try {
      //   jwtDecoded = jwt.verify(jwtEncoded, process.env.JWT_SECRET);
      // } catch (err) {
      //   if (err instanceof jwt.TokenExpiredError) {
      //     console.error("Token expired:", err.message);
      //   } else {
      //     console.error("Token verification failed:", err.message);
      //   }
      // }
      const emails = await getEmails(input.accessToken);

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
                // connect: { id: userId },
                connect: { id: jwtDecoded.id },
              },
            },
          });
        })
      );
      // return newCompanyApplications;
      return "Success";
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
