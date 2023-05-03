const { gql } = require("apollo-server-express");
const { DateTime, DateTimeResolver } = require("graphql-scalars");

const typeDefs = gql`
  scalar DateTime

  enum UserRole {
    ADMIN
    USER
  }

  type Query {
    user(email: String!): User!
    users: [User]!
    companyApplications: [CompanyApplication]!
  }

  type Mutation {
    AddSingleCompanyApplication(
      input: CompanyApplicationInput!
    ): CompanyApplication!
    AddMultipleCompanyApplications(
      input: [CompanyApplicationInput]!
    ): [CompanyApplication]!
    createUser(input: CreateUserInput!): User!
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

  input CreateUserInput {
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
    user: async (_, { email }, { prisma }) => {
      const user = await prisma.user.findUnique({
        where: {
          email: email,
        },
      });
      return user;
    },
    users: async (_, __, { prisma }) => {
      const users = await prisma.user.findMany();
      return users;
    },
    companyApplications: async (_, __, { prisma }) => {
      const companyApplications = await prisma.companyApplication.findMany();
      return companyApplications;
    },
  },
  Mutation: {
    createUser: async (_, { input }, { prisma }) => {
      try {
        const newUser = await prisma.user.create({
          data: {
            ...input,
          },
        });
        return newUser;
      } catch (error) {
        if (error.code === "P2002" && error.meta.target.includes("email")) {
          throw new Error(
            "User with this email already exists. Please create an account with a new email address."
          );
        }
      }
    },
    AddSingleCompanyApplication: async (_, { input }, { prisma }) => {
      const newCompanyApplication = await prisma.companyApplication.create({
        data: { ...input },
      });
      return newCompanyApplication;
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
