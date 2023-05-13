const express = require("express");
const cors = require("cors");
const { ApolloServer } = require("apollo-server-express");
const { PubSub } = require("graphql-subscriptions");
const { WebSocketServer } = require("ws");
const { useServer } = require("graphql-ws/lib/use/ws");
const { typeDefs, resolvers } = require("./schema");
const { PrismaClient } = require("@prisma/client");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const prisma = new PrismaClient();
const app = express();

// enable cors
const corsOptions = {
  origin: ["http://localhost:3000", "https://studio.apollographql.com"],
  credentials: true,
};
app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use(cookieParser());
async function startServer() {
  const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: ({ req, res }) => {
      const jwtCookie = req?.cookies?.jwt;
      const accessToken = req?.cookies?.access_token;
      let jwtDecoded = null;
      if (jwtCookie) {
        try {
          jwtDecoded = jwt.verify(jwtCookie, process.env.JWT_SECRET);
        } catch (error) {
          console.error("Error occurred with JWT decoding");
        }
      }
      return { jwtDecoded, res, prisma, accessToken };
    },
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
