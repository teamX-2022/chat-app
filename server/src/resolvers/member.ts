import { Context } from './../types/Context';
import { checkAuth } from './../middleware/checkAuth';
import { Member } from '../entities/Member';
import { Arg, Ctx, Mutation, Query, Resolver, UseMiddleware } from 'type-graphql';
import { FriendResolver } from './friend';
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

    @Query((_return) => [ResponseMemberRoom])
    @UseMiddleware(checkAuth)
    async getRooms(@Ctx() context: Context): Promise<ResponseMemberRoom[]> {
        const conversationResolver = new ConversationResolver();
        const conversationIds: string[] = await conversationResolver.getConversationIds(context);
        const rooms: ResponseMemberRoom[] = [];
        for (var item of conversationIds) {
            const room: ResponseMemberRoom = await this.getRoomChat(item);
            rooms.push(room);
        }
        return rooms;
    }

    @Query((_return) => ResponseMemberRoom)
    @UseMiddleware(checkAuth)
    async getRoomChat(@Arg('conversationId') conversationId: string): Promise<ResponseMemberRoom> {
        const members: Member[] = await MemberModel.find({ conversationId });

        return {
            members,
        };
    }
}
