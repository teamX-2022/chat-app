import { Context } from './../types/Context';
import { checkAuth } from './../middleware/checkAuth';
import { Member } from '../entities/Member';
// import { PipelineStage } from 'mongoose';
import { Arg, Ctx, Mutation, Query, Resolver, UseMiddleware } from 'type-graphql';
// import { FriendResolver } from './friend';
import { MemberModel } from '../models/Model';
import { ConversationResolver } from './conversation';
import { ResponseMemberRoom } from '../types/ResponseMemberRoom';

@Resolver()
export class MemberResolver {
    @Mutation((_return) => Member)
    async addMember(
        @Arg('name') name: string,
        @Arg('conversationId') conversationId: string,
        @Arg('userId') userId: string,
    ): Promise<Member> {
        if (name.length > 0 && conversationId.length > 0 && userId.length > 0) {
            const member = await MemberModel.create({
                name,
                conversationId,
                userId,
            });
            return await member.save();
        }

        throw new Error('params invalid');
    }

    // @Query((_return) => [ResponseMemberRoom])
    // @UseMiddleware(checkAuth)
    // async getRooms(@Ctx() context: Context): Promise<ResponseMemberRoom[]> {
    //     let response: string[] = [];
    //     const object = await MemberModel.aggregate([
    //         {
    //             $match: {
    //                 conversationId: '633402fca850ae6f95380a49',
    //             },
    //         },
    //         {
    //             $group: {
    //                 _id: '$conversationId',
    //                 members: {
    //                     $push: '$userId',
    //                 },
    //             },
    //         },
    //         {
    //             $project: {
    //                 _id: 0,
    //                 conversationId: '$_id',
    //                 members: 1,
    //             },
    //         },
    //     ]).exec();

    //     return object;
    // }
    // get member is my friend
    // nhan member la ban cua minh
    @Query((_return) => Member)
    @UseMiddleware(checkAuth)
    async getMyFriendByConversationId(
        @Ctx() { user: { userId } }: Context,
        @Arg('conversationId') conversationId: string,
    ): Promise<Member> {
        const conversationResolver = new ConversationResolver();

        const member = await MemberModel.findOne({
            conversationId: conversationId,
            userId: {
                $nin: [userId],
            },
        });

        if (!member) throw new Error('member not found');

        return member;
    }

    // @Query((_return) => Member)
    // @UseMiddleware(checkAuth)
    // async getMyFriendByConversationId(
    //     @Ctx() { user: { userId } }: Context,
    //     @Arg('conversationId') conversationId: string,
    // ): Promise<Member> {
    //     const conversationResolver = new ConversationResolver();

    //     const member = await MemberModel.findOne({
    //         conversationId: conversationId,
    //         userId: {
    //             $nin: [userId],
    //         },
    //     });
    //     console.log(member);

    //     if (!member) throw new Error('member not found');

    //     return member;
    // }
}
