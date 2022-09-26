require("dotenv").config();
import mongoose from "mongoose";
import express from "express";
import { createServer } from "http";
import { ApolloServer } from "apollo-server-express";
import { buildSchema } from "type-graphql";
import {
  ApolloServerPluginDrainHttpServer,
  ApolloServerPluginLandingPageGraphQLPlayground,
  ApolloServerPluginLandingPageLocalDefault,
} from "apollo-server-core";
import { makeExecutableSchema } from "@graphql-tools/schema";
import { WebSocketServer } from "ws";
import { useServer } from "graphql-ws/lib/use/ws";

import { GreetingResolve } from "./resolvers/greeting";
import { UserResolver } from "./resolvers/user";
import { Context } from "./types/Context";
import cookieParser from "cookie-parser";
import refreshTokenRouter from "./routes/refreshTokenRouter";
import cors from "cors";
import { FriendRequestResolver } from "./resolvers/friendRequests";
import { ConversationResolver } from "./resolvers/conversation";
import { MessageResolver } from "./resolvers/message";
import { FriendResolver } from "./resolvers/friend";

const MONGO_URI =
  "mongodb+srv://admin:mcb2T4w7sLifL85J@cluster1.gfxtcfv.mongodb.net/chat-app?retryWrites=true&w=majority";
async function connectDB() {
  await mongoose
    .connect(MONGO_URI)
    .then(() => console.log("Database connected!"))
    .catch((err) => console.log(err));
}

const main = async () => {
  const app = express();
  app.use(cors({ origin: "http://localhost:3000", credentials: true }));
  app.use(cookieParser());
  app.use("/refresh_token", refreshTokenRouter);

  const httpServer = createServer(app);
  const schema = await buildSchema({
    validate: false,
    resolvers: [
      GreetingResolve,
      UserResolver,
      FriendRequestResolver,
      ConversationResolver,
      MessageResolver,
      FriendResolver,
    ],
  });
  // Creating the WebSocket server
  const wsServer = new WebSocketServer({
    server: httpServer,
    path: "/graphql",
  });

  // Hand in the schema we just created and have the
  // WebSocketServer start listening.
  const serverCleanup = useServer({ schema }, wsServer);

  const apolloServer = new ApolloServer({
    schema,
    plugins: [
      ApolloServerPluginDrainHttpServer({ httpServer }),
      // ApolloServerPluginLandingPageGraphQLPlayground,
      ApolloServerPluginLandingPageLocalDefault({ embed: true }),
      // Proper shutdown for the WebSocket server.
      {
        async serverWillStart() {
          return {
            async drainServer() {
              await serverCleanup.dispose();
            },
          };
        },
      },
    ],
    context: ({ req, res }): Pick<Context, "req" | "res"> => ({ req, res }),
    // pub sub
    csrfPrevention: true,
    cache: "bounded",
  });

  connectDB();
  await apolloServer.start();
  await apolloServer.applyMiddleware({
    app,
    cors: { origin: "http://localhost:3000", credentials: true },
  });
  const PORT = process.env.PORT || 4000;

  await new Promise((resolve) =>
    httpServer.listen({ port: PORT }, resolve as () => void)
  );
  console.log(
    `server started on port ${PORT} and ws: ${apolloServer.graphqlPath}`
  );
};

main().catch((err) => console.log(err));
