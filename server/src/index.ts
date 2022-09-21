require('dotenv').config();
import mongoose from 'mongoose';
import express from 'express';
import { createServer } from 'http';
import { ApolloServer } from 'apollo-server-express';
import { buildSchema } from 'type-graphql';
import { ApolloServerPluginDrainHttpServer, ApolloServerPluginLandingPageGraphQLPlayground } from 'apollo-server-core';
import { GreetingResolve } from './resolvers/greeting';
import { UserResolver } from './resolvers/user';
import { Context } from './types/Context';
import cookieParser from 'cookie-parser';
import refreshTokenRouter from './routes/refreshTokenRouter';
import cors from 'cors';

const MONGO_URI =
    'mongodb+srv://admin:mcb2T4w7sLifL85J@cluster1.gfxtcfv.mongodb.net/chat-app?retryWrites=true&w=majority';
async function connectDB() {
    await mongoose
        .connect(MONGO_URI)
        .then(() => console.log('Database connected!'))
        .catch((err) => console.log(err));
}

const main = async () => {
    const app = express();
    app.use(cors({ origin: 'http://localhost:3000', credentials: true }));
    app.use(cookieParser());
    app.use('/refresh_token', refreshTokenRouter);

    const httpServer = createServer(app);
    const apolloServer = new ApolloServer({
        schema: await buildSchema({
            validate: false,
            resolvers: [GreetingResolve, UserResolver],
        }),
        plugins: [ApolloServerPluginDrainHttpServer({ httpServer }), ApolloServerPluginLandingPageGraphQLPlayground],
        context: ({ req, res }): Pick<Context, 'req' | 'res'> => ({ req, res }),
    });

    connectDB();
    await apolloServer.start();
    await apolloServer.applyMiddleware({ app, cors: { origin: 'http://localhost:3000', credentials: true } });
    const PORT = process.env.PORT || 4000;

    await new Promise((resolve) => httpServer.listen({ port: PORT }, resolve as () => void));
    console.log(`server started on port ${PORT}`);
};

main().catch((err) => console.log(err));
