import { index } from "@typegoose/typegoose";
import { Field, InputType } from "type-graphql";

@InputType()
export class FriendRequestInput {
  @Field()
  userId!: string;
  @Field()
  requestId!: string;
}
