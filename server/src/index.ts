
import  mongoose from "mongoose";
import express from 'express'
import { createServer } from "http";
import { ApolloServer } from "apollo-server-express";
import { buildSchema } from "type-graphql";
import { ApolloServerPluginDrainHttpServer, ApolloServerPluginLandingPageGraphQLPlayground } from "apollo-server-core";
import { GreetingResolve } from "./resolvers/greeting";
import { UserResolver } from "./resolvers/user";



const MONGO_URI='mongodb+srv://admin:mcb2T4w7sLifL85J@cluster1.gfxtcfv.mongodb.net/chat-app?retryWrites=true&w=majority'
async function connectDB() {
    
    await mongoose.connect(MONGO_URI)   
        .then(() => console.log("Database connected!"))
        .catch(err => console.log(err));
    
}

const main = async ()=>{
    const app = express()
    const httpServer = createServer(app)
    const apolloServer = new ApolloServer({
        schema: await buildSchema({
            validate: false,
            resolvers: [GreetingResolve, UserResolver]
        }),
        plugins: [
            ApolloServerPluginDrainHttpServer({httpServer}), ApolloServerPluginLandingPageGraphQLPlayground
        ]
    })

    connectDB();
    await apolloServer.start()
    await apolloServer.applyMiddleware({app})
    const PORT = process.env.PORT || 4000

    await new Promise(resolve => httpServer.listen({port: PORT }, resolve as ()=> void))
    console.log(`server started on port ${PORT}`);

}


main().catch(err => console.log(err));
