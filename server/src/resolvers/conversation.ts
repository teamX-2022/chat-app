import { checkAuth } from './../middleware/checkAuth';
import { Context } from './../types/Context';
import { ConversationInput } from '../types/ConversationInput';
import { Arg, Ctx, ID, Mutation, Query, Resolver, UseMiddleware } from 'type-graphql';
import { ConversationModel } from '../models/Model';
import { ObjectId } from 'mongodb';
import { FriendResolver } from './friend';
import { MemberResolver } from './member';

@Resolver()
export class ConversationResolver {
    @Mutation((_return) => ID)
    public async createConversation(@Arg('conversation') { name, members }: ConversationInput): Promise<ObjectId> {
        if (name.length <= 0) throw new Error('name must not empty');
        if (!members) throw new Error('member must not empty');

        const conversation = await ConversationModel.create({
            name,
            members,
        });

        const { _id } = await conversation.save();
        const friendResolver = new FriendResolver();
        const name1 = await friendResolver.getNameById(members[0]);
        const name2 = await friendResolver.getNameById(members[1]);
        const memberResolver = new MemberResolver();
        memberResolver.addMember(name1, _id.toString(), members[0]);
        memberResolver.addMember(name2, _id.toString(), members[1]);
        return _id;
    }

    @Query((_return) => [String])
    @UseMiddleware(checkAuth)
    async getConversationIds(@Ctx() { user: { userId } }: Context): Promise<string[]> {
        const list = await ConversationModel.find({ members: { $in: [userId] } });
        const conversationIds: string[] = [];
        for (var item of list) {
            conversationIds.push(item._id.toString());
        }
        return conversationIds;
    }
}
