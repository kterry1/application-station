const { gql } = require("apollo-server-express");
const { DateTime, DateTimeResolver } = require("graphql-scalars");
const axios = require("axios");

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
    authenticateWithGoogle: User!
    AddSingleCompanyApplication(
      input: CompanyApplicationInput!
    ): CompanyApplication!
    AddMultipleCompanyApplications(
      input: [CompanyApplicationInput]!
    ): [CompanyApplication]!
  }

  type User {
    id: ID!
    name: String!
    email: String!
    lastLoggedIn: DateTime
    role: UserRole
    companyApplications: [CompanyApplication]
  }

  type CompanyApplication {
    id: ID!
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
    companyApplications: async (_, __, { prisma }) => {
      const companyApplications = await prisma.companyApplication.findMany();
      return companyApplications;
    },
  },
  Mutation: {
    authenticateWithGoogle: async (_, __, { prisma, accessToken }) => {
      const userInfo = await axios
        .get(
          `https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=${accessToken}`
        )
        .then((response) => {
          return response;
        })
        .catch((error) => {
          console.log(error);
        });
      console.log(userInfo.data);
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
        return newUser;
      }

      return user;
    },
    AddSingleCompanyApplication: async (_, { input }, { prisma, req }) => {
      console.log(req);
      const newCompanyApplication = await prisma.companyApplication.create({
        data: { ...input },
      });
      return newCompanyApplication;
    },
    importMultipleCompanyApplications: async (
      _,
      __,
      { prisma, accessToken }
    ) => {
      const input = getEmails(accessToken);
      const newCompanyApplications = await Promise.all(
        input.map(async (companyApplication, index) => {
          await new Promise((resolve) => setTimeout(resolve, index * 500));
          return await prisma.companyApplication.create({
            data: {
              ...companyApplication,
              user: {
                // connect: { id: userId },
                connect: { id: 5 },
              },
            },
          });
        })
      );
      return;
      return newCompanyApplications;
    },
    AddMultipleCompanyApplications: async (_, { input }, { prisma }) => {
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
        input.map(async (companyApplication, index) => {
          await new Promise((resolve) => setTimeout(resolve, index * 500));
          return await prisma.companyApplication.create({
            data: {
              ...companyApplication,
              user: {
                // connect: { id: userId },
                connect: { id: 5 },
              },
            },
          });
        })
      );

      return newCompanyApplications;
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
