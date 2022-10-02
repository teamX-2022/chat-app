import { Index, prop, Ref } from '@typegoose/typegoose';
import { ObjectId } from 'mongodb';
import { Field, ID, ObjectType } from 'type-graphql';
import { Conversation } from './Conversation';
import { User } from './User';

@Index({ userIds: 1 })
@ObjectType()
export class Friend {
    @Field(() => ID)
    readonly _id: string;
    @Field(() => [String])
    @prop()
    userIds: string[];
}
