import { ConversationInput } from "../types/ConversationInput";
import { Arg, ID, Mutation, Resolver } from "type-graphql";
import { ConversationModel } from "../models/Model";
import { ObjectId } from "mongodb";

@Resolver()
export class ConversationResolver {
  @Mutation((_return) => ID)
  async createConversation(
    @Arg("conversation") { name, members }: ConversationInput
  ): Promise<ObjectId> {
    const conversation = await ConversationModel.create({
      name,
      members,
    });

    const rs = await conversation.save();

    return rs._id;
  }
}
