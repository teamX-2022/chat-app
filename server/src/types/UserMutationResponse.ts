// import { ObjectId } from 'mongodb';
import { Field, ID, ObjectType } from 'type-graphql';
// import { User } from "../entities/User";
import { IMutationResponse } from './MutationResponse';

@ObjectType({ implements: IMutationResponse })
export class UserMutationResponse implements IMutationResponse {
    code: number;
    success: boolean;
    message?: string;
    refreshToken?: string;
    @Field(() => ID)
    userId?: string;
    @Field({ nullable: true })
    accessToken?: string;
}
