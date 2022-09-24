import { CreateMessageInput } from "../types/CreateMessageInput";
import {
  Arg,
  Mutation,
  Resolver,
  Root,
  PubSub,
  Subscription,
  PubSubEngine,
} from "type-graphql";
import { MessageModel } from "../models/Model";
import { Message } from "../entities/Message";
import { MessageResponse } from "../types/MessageResponse";
import { ObjectId } from "mongodb";

// import { PubSub } from "graphql-subscriptions";

// const pubsub = new PubSub();

@Resolver()
export class MessageResolver {
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
  @Subscription({ topics: ({ args }) => args.topic })
  messageSent(
    @Arg("topic") topic: String,
    @Root() { _id, conversationId, messageText, createdAt, senderId }: Message
  ): Message {
    console.log(messageText);

    return { _id, conversationId, messageText, createdAt, senderId };
  }
}
