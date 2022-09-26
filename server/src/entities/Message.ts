import { prop, Ref } from "@typegoose/typegoose";
import { ObjectId } from "mongodb";
import { Field, ID, ObjectType } from "type-graphql";
import { Conversation } from "./Conversation";
import { User } from "./User";

@ObjectType()
export class Message {
  @Field(() => ID, { nullable: true })
  readonly _id: ObjectId;

  @Field(() => ID)
  @prop({ ref: () => User, type: () => String })
  senderId: Ref<User, string>;
  @Field()
  @prop()
  messageText: string;

  @Field()
  @prop({ default: Date.now() })
  createdAt: Date;

  @Field(() => String)
  @prop({ ref: () => Conversation, type: () => String })
  conversationId: Ref<Conversation, string>;
}
