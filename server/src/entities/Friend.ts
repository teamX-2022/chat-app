import { Index, prop, Ref } from "@typegoose/typegoose";
import { Field, ID, ObjectType } from "type-graphql";
import { Conversation } from "./Conversation";
import { User } from "./User";

@Index({ userId: 1, friendId: 1, conversationId: 1 }, { unique: true })
@ObjectType()
export class Friend {
  @Field(() => ID)
  @prop({ ref: () => User, type: () => String })
  userId: Ref<User, string>;

  @Field(() => ID)
  @prop({ ref: () => User, type: () => String })
  friendId: Ref<User, string>;

  @Field(() => ID)
  @prop({ ref: () => Conversation, type: () => String })
  conversationId: Ref<Conversation, string>;
}
