const { gql } = require("apollo-server-express");

const typeDefs = gql`
  type Query {
    users: [User!]!
  }

  type User {
    id: ID!
    name: String!
  }

  type Mutation {
    addUser(name: String!): User!
  }
`;

const resolvers = {
  Query: {
    users: async (parent, args, { prisma }) => {
      return await prisma.user.findMany();
    },
  },
  Mutation: {
    addUser: async (parent, { name }, { prisma }) => {
      const newUser = await prisma.user.create({
        data: {
          name: name,
        },
      });

      return newUser;
    },
  },
};

module.exports = { typeDefs, resolvers };
