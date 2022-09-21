import { LoginInput } from './../types/LoginInput';
import { Arg, Mutation, Resolver } from "type-graphql";

import 'reflect-metadata'
import { RegisterInput } from "../types/RegisterInput";
import UserModel from "../models/UserModel";
import  argon2 from "argon2";
import { UserMutationResponse } from "../types/UserMutationResponse";
import { createToken } from '../utils/auth';
// import { User } from "../entities/User";
// import { UserRegisterResult } from "../types/UserRegisterResult";

@Resolver()
export class UserResolver {
    @Mutation(_return  => UserMutationResponse)
    async register(
        @Arg('registerInput')
        registerInput: RegisterInput) : Promise<UserMutationResponse>{
        const {username, password, email} = registerInput
        const existingUser = await UserModel.findOne({
            username
        })

        if(existingUser){
            return {
                code: 400,
                success: false,
                message: 'Duplicated username'
            }
        }
        const hashedPassword = await argon2.hash(password)
        
        const newUser = await UserModel.create({
            email,
            username,
            password: hashedPassword
        }).then(data => data.save());
        


        
        return {
            code: 200,
            success: true,
            message: 'User registration successfull',
            userId: newUser._id
        }
    }

    @Mutation(_return => UserMutationResponse)
    async login(
        @Arg('loginInput')
        {email, username, password}: LoginInput) : Promise<UserMutationResponse>{
        
        
        const existingUser = await UserModel.findOne({
            username
        })


        
        if(!existingUser){
            return {
                code: 400,
                success: false,
                message: "user or password invalid"
            }
        }


        const isPasswordValid = await argon2.verify(existingUser.password, password)
        if(!isPasswordValid){
            return {
                code: 400,
                success: false,
                message: "incorrect password"
            }
        }

        return {
            code: 200,
            success: true,
            message: "login successfully",
            userId: existingUser._id,
            accessToken: createToken(existingUser)
        }


    }

}