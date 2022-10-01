import { ConversationModel, FriendModel, UserModel } from '../models/Model';
import { Context } from '../types/Context';
import { Arg, Ctx, ID, Mutation, Query, Resolver, UseMiddleware } from 'type-graphql';
import { ObjectId } from 'mongodb';
import { checkAuth } from '../middleware/checkAuth';
import { Friend } from '../entities/Friend';
import { ConversationResolver } from './conversation';
import { UserResolver } from './user';

@Resolver()
export class FriendResolver {
    @Query((returns) => [Friend])
    @UseMiddleware(checkAuth)
    async getFriends(@Ctx() { user: { userId } }: Context): Promise<Friend[]> {
        const friends = await FriendModel.find({
            userIds: { $in: [userId] },
        }).exec();
        return friends;
    }

    @Query((returns) => Boolean)
    @UseMiddleware(checkAuth)
    async isFriendExisted(@Arg('userId1') userId1: string, @Arg('userId2') userId2: string): Promise<boolean> {
        const friend = await FriendModel.findOne({
            userIds: [userId1, userId2],
        }).exec();
        return friend ? true : false;
    }

    @Query((_return) => String)
    @UseMiddleware(checkAuth)
    async getNameById(@Arg('userId') userId: string): Promise<string> {
        const userResolver = new UserResolver();
        const { name } = await userResolver.getUser(userId);
        return name;
    }

    @Mutation(() => ID)
    @UseMiddleware(checkAuth)
    async addFriend(@Arg('friendId') friendId: string, @Ctx() context: Context): Promise<ObjectId> {
        const {
            user: { userId },
        } = context;

        const isExistingFriend = await this.isFriendExisted(userId, friendId);

        if (isExistingFriend) throw new Error('friend is existed');

        const requestUser = UserModel.findOne({ _id: friendId });

        if (!requestUser) throw new Error('user not found');

        const name = '';

        const friend = await FriendModel.create({
            userIds: [userId, friendId],
        });

        await friend.save();

        const conversation = new ConversationResolver();
        const conv = await conversation.createConversation({
            name,
            members: [userId, friendId],
        });
        return conv;
    }

    @Mutation((_return) => Boolean)
    @UseMiddleware(checkAuth)
    async deleteFriend(@Arg('friendId') friendId: string, @Ctx() context: Context): Promise<boolean> {
        const {
            user: { userId },
        } = context;
        console.log(userId, friendId);

        await ConversationModel.deleteOne({ members: [userId, friendId] });

        const friend = await FriendModel.deleteOne({ userIds: [userId, friendId] });
        return true;
    }
}
