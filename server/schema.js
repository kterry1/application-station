const { gql } = require("apollo-server-express");
const { DateTime, DateTimeResolver } = require("graphql-scalars");

const typeDefs = gql`
  scalar DateTime

  type Query {
    user(email: String!): User!
    companyApplications: [CompanyApplication]!
  }

  type User {
    id: ID!
    name: String!
    email: String!
    isAuthenticated: Boolean!
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
`;

const resolvers = {
  DateTime: DateTimeResolver,
  Query: {
    user: async (_, { email }, { db }) => {
      const users = db.users.filter((user) => user.email === email);
      if (!users[0]) throw new Error("No user with that email");
      return users[0];
    },
    companyApplications: (_, _, { db }) => {
      return db.companyApplications;
    },
  },
  User: {
    companyApplications: (parent, _, { db }) => {
      return db.companyApplications.filter(
        (companyApplication) => companyApplication.userId === parent.id
      );
    },
  },
  CompanyApplication: {
    user: (parent, _, { db }) => {
      const users = db.users.filter((user) => user.id === parent.userId);
      if (!users[0]) throw new Error("No user with that email");
      return users[0];
    },
  },
};

module.exports = { typeDefs, resolvers };
