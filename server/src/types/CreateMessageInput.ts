import { InputType, Field } from 'type-graphql';

@InputType()
export class CreateMessageInput {
    @Field()
    messageText: string;
    @Field()
    conversationId: string;
}
