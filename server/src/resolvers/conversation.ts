import { checkAuth } from './../middleware/checkAuth';
import { Context } from './../types/Context';
import { ConversationInput } from '../types/ConversationInput';
import { Arg, Ctx, ID, Mutation, Query, Resolver, UseMiddleware } from 'type-graphql';
import { ConversationModel } from '../models/Model';
import { ObjectId } from 'mongodb';
import { FriendResolver } from './friend';
import { MemberResolver } from './member';
import { Conversation } from '../entities/Conversation';

@Resolver()
export class ConversationResolver {
    //tao room chat voi ban be
    @Mutation((_return) => ID)
    @UseMiddleware(checkAuth)
    public async createConversation(@Arg('conversation') { name, members }: ConversationInput): Promise<string> {
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

    // tao room chat voi nhom
    @Mutation((_return) => ID)
    @UseMiddleware(checkAuth)
    public async createGroupConversation(
        @Ctx() { user: { userId } }: Context,
        @Arg('conversation') { name, members }: ConversationInput,
    ): Promise<string> {
        if (!name) throw new Error('name must not empty');
        if (!members || members.length === 0) throw new Error('member must not empty');

        const conversation = await ConversationModel.create({
            name,
            members,
            leaderId: userId,
        });

        const { _id } = await conversation.save();
        const friendResolver = new FriendResolver();
        const memberResolver = new MemberResolver();
        for (let i = 0; i < members.length; ++i) {
            const name1 = await friendResolver.getNameById(members[i]);
            await memberResolver.addMember(name1, _id.toString(), members[i]);
        }
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

    // get ds chat
    @Query((_return) => [Conversation])
    @UseMiddleware(checkAuth)
    async getListConversation(@Ctx() { user: { userId } }: Context): Promise<Conversation[]> {
        const list = await ConversationModel.find({ members: { $in: [userId] } });

        return list;
    }

    @Mutation((_return) => Boolean)
    async addLastMessageId(conversationId: string, messageId: string): Promise<boolean> {
        const cvst = await ConversationModel.findOne({ _id: conversationId });
        if (!cvst) throw new Error('conversation not found');
        cvst.lastMessageId = messageId;
        await cvst.save();
        return true;
    }

    @Query((_return) => Conversation)
    @UseMiddleware(checkAuth)
    async getConversationById(@Arg('conversationId') conversationId: string): Promise<Conversation> {
        const conversation = await ConversationModel.findOne({
            _id: conversationId,
        });

        if (!conversation) throw new Error('conversationId is not exists');
        return conversation;
    }
}
