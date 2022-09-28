import { CreateMessageInput } from "../types/CreateMessageInput";
import {
  Arg,
  Mutation,
  Resolver,
  Root,
  PubSub,
  Subscription,
  PubSubEngine,
  Query,
  Ctx,
  UseMiddleware,
} from "type-graphql";
import { MessageModel } from "../models/Model";
import { Message } from "../entities/Message";
import { ObjectId } from "mongodb";
import { checkAuth } from "../middleware/checkAuth";
import { Context } from "../types/Context";

// import { PubSub } from "graphql-subscriptions";

// const pubsub = new PubSub();

@Resolver()
export class MessageResolver {
  // create message
  @Mutation((returns) => Message)
  async createMessage(
    @Arg("createMessageInput")
    createMessageInput: CreateMessageInput,
    @PubSub() pubSub: PubSubEngine
  ): Promise<Message> {
    const { senderId, conversationId, messageText } = createMessageInput;
    const mess = await MessageModel.create({
      senderId,
      conversationId,
      messageText,
    });
    const msg = await mess.save();
    const id: ObjectId | null = msg._id;
    const createdAt = msg.createdAt;
    const payload = {
      _id: id,
      conversationId,
      messageText,
      createdAt,
      senderId,
    };
    await pubSub.publish(conversationId, payload);
    return msg;
  }

  // listen message
  @Subscription({ topics: ({ args }) => args.topic })
  messageSent(
    @Arg("topic") topic: String,
    @Root() { _id, conversationId, messageText, createdAt, senderId }: Message
  ): Message {
    console.log(messageText);

    return { _id, conversationId, messageText, createdAt, senderId };
  }

  @Query(() => [Message])
  @UseMiddleware(checkAuth)
  async getMessages(
    @Ctx() { user: { userId } }: Context,
    @Arg("friendId") friendId: string,
    @Arg("conversationId") conversationId: string
  ): Promise<Message[]> {
    const messages = await MessageModel.find({
      conversationId: conversationId,
    }).exec();
    return messages;
  }
}
