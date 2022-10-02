import { index, modelOptions, prop, Ref } from '@typegoose/typegoose';
import { Field, ID, ObjectType } from 'type-graphql';
import { User } from './User';

@ObjectType()
@index({ userId: 1, requestId: 1 }, { unique: true })
@modelOptions({ options: { customName: 'friend_requests' } })
export class FriendRequest {
    @Field(() => ID, { nullable: true })
    readonly _id: string;
    @Field(() => ID)
    @prop({ type: () => String, ref: () => User })
    userId!: Ref<User, string>;
    @Field(() => ID)
    @prop({ type: () => String, ref: () => User })
    requestId!: Ref<User, string>;
}
