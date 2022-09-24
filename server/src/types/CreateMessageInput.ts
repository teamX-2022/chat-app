import { InputType, Field } from "type-graphql";

@InputType()
export class CreateMessageInput {
  @Field()
  senderId: string;
  @Field()
  messageText: string;
  @Field()
  conversationId: string;
}
