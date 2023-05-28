const express = require("express");
const cors = require("cors");
const { createServer } = require("http");
const { ApolloServer } = require("apollo-server-express");
const { WebSocketServer } = require("ws");
const { useServer } = require("graphql-ws/lib/use/ws");
const { makeExecutableSchema } = require("@graphql-tools/schema");
const { resolvers } = require("./resolvers");
const { readFileSync } = require("fs");
const { PrismaClient } = require("@prisma/client");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const {
  ApolloServerPluginDrainHttpServer,
} = require("@apollo/server/plugin/drainHttpServer");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const typeDefs = readFileSync("./schema.graphql", { encoding: "utf-8" });
const prisma = new PrismaClient();
const app = express();
const httpServer = createServer(app);
const schema = makeExecutableSchema({ typeDefs, resolvers });

// ws Server
const wsServer = new WebSocketServer({
  server: httpServer,
  path: "/subscriptions",
});

const serverCleanUp = useServer({ schema }, wsServer); // Gives access to a dispose function

// enable cors
const corsOptions = {
  origin: [
    "http://localhost:3000",
    "https://studio.apollographql.com",
    "https://application-database.herokuapp.com/",
  ],
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
    plugins: [
      ApolloServerPluginDrainHttpServer({ httpServer }),
      {
        async serverWillStart() {
          return {
            async drainServer() {
              await serverCleanUp.dispose();
            },
          };
        },
      },
    ],
  });

  await server.start();
  server.applyMiddleware({
    app,
    cors: {
      origin: [
        "http://localhost:3000",
        "https://studio.apollographql.com",
        "https://application-database.herokuapp.com/",
      ],
      credentials: true,
    },
  });

  const PORT = process.env.PORT || 4000;
  httpServer.listen(PORT, () => {
    console.log(
      `Server ready at http://localhost:${PORT}${server.graphqlPath}`
    );
  });
}

startServer();
