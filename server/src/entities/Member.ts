import { index, modelOptions, prop, Ref } from "@typegoose/typegoose";
import { Field, ID, ObjectType } from "type-graphql";
import { Conversation } from "./Conversation";
import { User } from "./User";

@ObjectType()
@index({ userId: 1, conversationId: 1 }, { unique: true })
@modelOptions({ options: { customName: "members" } })
export class Member {
  @Field(() => ID)
  @prop({ type: () => String, ref: () => User })
  userId: Ref<User, string>;
  @Field(() => ID)
  @prop({ type: () => String, ref: () => Conversation })
  conversationId: Ref<Conversation, string>;

  @Field()
  @prop()
  name: string;

  @Field(() => Date)
  @prop({ default: new Date() })
  createdAt: Date;
}
