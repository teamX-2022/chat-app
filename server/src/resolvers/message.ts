import { ConversationResolver } from './conversation';
import { CreateMessageInput } from '../types/CreateMessageInput';
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
} from 'type-graphql';
import { MessageModel } from '../models/Model';
import { Message } from '../entities/Message';
import { ObjectId } from 'mongodb';
import { checkAuth } from '../middleware/checkAuth';
import { Context } from '../types/Context';

// import { PubSub } from "graphql-subscriptions";

// const pubsub = new PubSub();

const chanel = 'MESSAGE_CHAT';

@Resolver()
export class MessageResolver {
    // create message
    @Mutation((returns) => Message)
    @UseMiddleware(checkAuth)
    async createMessage(
        @Ctx() context: Context,
        @Arg('createMessageInput')
        createMessageInput: CreateMessageInput,
        @PubSub() pubSub: PubSubEngine,
    ): Promise<Message> {
        const { conversationId, messageText } = createMessageInput;
        const {
            user: { userId },
        } = context;
        const mess = await MessageModel.create({
            senderId: userId,
            conversationId,
            messageText,
        });
        const msg = await mess.save();
        const conversationResolver = new ConversationResolver();
        await conversationResolver.addLastMessageId(conversationId, msg._id);
        const id: string | null = msg._id;
        const createdAt = msg.createdAt;
        const payload = {
            _id: id,
            conversationId,
            messageText,
            createdAt,
            senderId: userId,
        };
        await pubSub.publish(conversationId, payload);
        return msg;
    }

    // listen message
    @Subscription(() => Message, { topics: ({ args }) => args.topic })
    messageSent(
        @Arg('topic') topic: String,
        @Root() { _id, conversationId, messageText, createdAt, senderId }: Message,
    ): Message {
        console.log(messageText);

        return { _id, conversationId, messageText, createdAt, senderId };
    }

    @Subscription(() => Message, { topics: chanel })
    messageSent2(@Root() { _id, conversationId, messageText, createdAt, senderId }: Message): Message {
        console.log(messageText);

        return { _id, conversationId, messageText, createdAt, senderId };
    }

    @Query(() => [Message])
    @UseMiddleware(checkAuth)
    async getMessages(@Arg('conversationId') conversationId: string): Promise<Message[]> {
        const messages = await MessageModel.find({
            conversationId: conversationId,
        }).exec();
        return messages;
    }
}
