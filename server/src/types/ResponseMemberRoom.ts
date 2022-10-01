import { Field, ObjectType } from 'type-graphql';
import { Member } from './../entities/Member';
@ObjectType()
export class ResponseMemberRoom {
    @Field((_return) => [Member])
    members: Member[];
}
