import { ConversationModel, FriendModel, UserModel } from "../models/Model";
import { Context } from "../types/Context";
import { Arg, Ctx, ID, Mutation, Resolver, UseMiddleware } from "type-graphql";
import { ObjectId } from "mongodb";
import { checkAuth } from "../middleware/checkAuth";

@Resolver()
export class FriendResolver {
  @Mutation(() => ID)
  @UseMiddleware(checkAuth)
  async addFriend(
    @Arg("friendId") friendId: string,
    @Ctx() context: Context
  ): Promise<ObjectId> {
    const {
      user: { userId },
    } = context;

    const requestUser = UserModel.findOne({ _id: friendId });

    if (!requestUser) throw new Error("user not found");

    const name = requestUser.firstName + " " + requestUser.lastName;

    const conversation = await ConversationModel.create({
      name,
      members: [userId, friendId],
    });
    const { _id } = await conversation.save();

    const friend = await FriendModel.create({
      userId,
      friendId,
      conversationId: _id,
    });

    const { _id: id } = await friend.save();

    return id;
  }
}
