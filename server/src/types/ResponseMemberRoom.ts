import { Field, ObjectType } from 'type-graphql';
import { Member } from './../entities/Member';
@ObjectType()
export class ResponseMemberRoom {
    @Field((_return) => [Member])
    memberList: Member[];
    @Field((_return) => [String])
    members: string[];
    @Field((_return) => String)
    _id: string;
    @Field((_return) => String)
    name_group: string;
}
