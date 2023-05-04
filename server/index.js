const express = require("express");
const cors = require("cors");
const { ApolloServer } = require("apollo-server-express");
const { typeDefs, resolvers } = require("./schema");
const { PrismaClient } = require("@prisma/client");
const cookieParser = require("cookie-parser");
const prisma = new PrismaClient();
const app = express();
// enable cors
var corsOptions = {
  origin: ["http://localhost:3000", "https://studio.apollographql.com"],
  credentials: true,
};
app.use(cors(corsOptions));
app.use(cookieParser());
async function startServer() {
  const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: ({ req }) => ({ prisma, accessToken: req.cookies.access_token }),
  });

  await server.start();
  server.applyMiddleware({
    app,
    cors: {
      origin: ["http://localhost:3000", "https://studio.apollographql.com"],
      credentials: true,
    },
  });

  const PORT = process.env.PORT || 4000;
  app.listen(PORT, () => {
    console.log(
      `Server ready at http://localhost:${PORT}${server.graphqlPath}`
    );
  });
}

startServer();
