import { Field, InputType } from 'type-graphql';

@InputType()
export class ConversationInput {
    @Field()
    name: string;
    @Field(() => [String])
    members?: string[];
}
