import { prop, Ref } from '@typegoose/typegoose';
import { ObjectId } from 'mongodb';
import { Field, ID, ObjectType } from 'type-graphql';
import { Message } from './Message';
import { User } from './User';

@ObjectType()
export class Conversation {
    @Field(() => ID, { nullable: true })
    readonly _id: string;

    @Field()
    @prop()
    name: string;
    @Field({ nullable: true })
    @prop()
    lastMessageId: string;
    @Field({ nullable: true })
    @prop()
    leaderId: ObjectId;

    @Field(() => [String])
    @prop({ type: () => String, ref: () => User })
    members: Ref<User, string>[];
    @Field(() => [Message])
    @prop({ ref: () => Message })
    messages: Ref<Message>[];
}
