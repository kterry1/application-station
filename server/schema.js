const { gql } = require("apollo-server-express");
const { DateTime, DateTimeResolver } = require("graphql-scalars");

const typeDefs = gql`
  scalar DateTime

  type Query {
    user(email: String!): User!
    users: [User]!
    companyApplications: [CompanyApplication]!
  }

  type Mutation {
    companyApplication(input: CompanyApplicationInput!): CompanyApplication!
  }

  type User {
    id: ID!
    name: String!
    email: String!
    isAuthenticated: Boolean!
    lastLoggedIn: DateTime
    companyApplications: [CompanyApplication]!
  }

  type CompanyApplication {
    id: ID!
    companyName: String!
    position: String!
    awaitingResponse: Boolean!
    rejected: Boolean!
    nextRound: Boolean!
    receivedOffer: Boolean!
    acceptedOffer: Boolean!
    notes: String
    appliedAt: DateTime!
    createdAt: DateTime!
    updatedAt: DateTime!
    user: User!
  }

  input CompanyApplicationInput {
    companyName: String!
    position: String!
    awaitingResponse: Boolean!
    rejected: Boolean!
    nextRound: Boolean!
    receivedOffer: Boolean!
    acceptedOffer: Boolean!
    notes: String
    appliedAt: DateTime!
    userId: Int!
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
    companyApplication: async (_, { input }, { prisma }) => {
      const newCompanyApplication = await prisma.companyApplication.create({
        data: { ...input },
      });
      return newCompanyApplication;
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
