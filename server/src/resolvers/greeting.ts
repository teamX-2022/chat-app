import { User } from './../entities/User';
import { Context } from '../types/Context';
import { checkAuth } from '../middleware/checkAuth';
import { Ctx, Query, Resolver, UseMiddleware, ID } from "type-graphql";
import 'reflect-metadata'
import UserModel from '../models/UserModel';
import { ObjectId } from 'mongodb';

@Resolver()
export class GreetingResolve{
    @Query(_return => String)
    @UseMiddleware(checkAuth)
    async hello(@Ctx() {user} : Context): Promise<string> {
        
            const existingUser =  await UserModel.findOne({username : "admin"})
            console.log(existingUser?.password);
        
        return `hello ${existingUser?.username} world`
    }
}