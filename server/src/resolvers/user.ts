import { Context } from '../types/Context';
import { LoginInput } from './../types/LoginInput';
import { Arg, Ctx, ID, Mutation, Query, Resolver } from 'type-graphql';

import 'reflect-metadata';
import { RegisterInput } from '../types/RegisterInput';
import { UserModel } from '../models/Model';
import argon2 from 'argon2';
import { UserMutationResponse } from '../types/UserMutationResponse';
import { createToken, sendRefreshToken } from '../utils/auth';
import { User } from '../entities/User';
import { ObjectId } from 'mongodb';

@Resolver()
export class UserResolver {
    // lấy tất cả user
    @Query((_return) => [User])
    async users(): Promise<User[]> {
        const us = await UserModel.find({});

        return us;
    }

    // lấy 1 user
    @Query((_return) => User)
    async getUser(@Arg('userId') userId: string): Promise<User> {
        const user = await UserModel.findOne({ _id: userId });
        if (!user) throw new Error('user not found');
        return user;
    }

    @Mutation((_return) => UserMutationResponse)
    async register(
        @Arg('registerInput')
        registerInput: RegisterInput,
    ): Promise<UserMutationResponse> {
        const { name, username, password } = registerInput;
        const existingUser = await UserModel.findOne({
            username,
        });

        if (existingUser) {
            return {
                code: 400,
                success: false,
                message: 'Duplicated username',
            };
        }
        const hashedPassword = await argon2.hash(password);

        const newUser = await UserModel.create({
            name: name ? name : username,
            username,
            password: hashedPassword,
        }).then((data) => data.save());

        return {
            code: 200,
            success: true,
            message: 'User registration successfull',
            userId: newUser._id,
        };
    }

    @Mutation((_return) => UserMutationResponse)
    async login(
        @Ctx() { res }: Context,
        @Arg('loginInput')
        { username, password }: LoginInput,
    ): Promise<UserMutationResponse> {
        const existingUser = await UserModel.findOne({
            username,
        });

        if (!existingUser) {
            return {
                code: 400,
                success: false,
                message: 'user or password invalid',
            };
        }

        const isPasswordValid = await argon2.verify(existingUser.password, password);
        if (!isPasswordValid) {
            return {
                code: 400,
                success: false,
                message: 'incorrect password',
            };
        }
        sendRefreshToken(res, existingUser);
        return {
            code: 200,
            success: true,
            message: 'login successfully',
            userId: existingUser._id,
            accessToken: createToken('accessToken', existingUser),
        };
    }

    @Mutation((_return) => UserMutationResponse)
    async logout(
        @Arg('userId', (_return) => ID) userId: string,
        @Ctx() { res }: Context,
    ): Promise<UserMutationResponse> {
        const existingUser = await UserModel.findOne({ _id: userId });
        if (!existingUser)
            return {
                code: 400,
                success: false,
            };

        existingUser.tokenVersion += 1;
        await existingUser.save();

        res.clearCookie(process.env.REFRESH_TOKEN_COOKIE_NAME as string);
        return {
            code: 200,
            success: true,
        };
    }
}
