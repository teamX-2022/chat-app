import { Field, ID, ObjectType } from "type-graphql";
import { IMutationResponse } from "./MutationResponse";

@ObjectType({ implements: IMutationResponse })
export class FriendRequestMutationResponse implements IMutationResponse {
  code: number;
  success: boolean;
  message: string;
  refreshToken?: string;
  @Field(() => ID)
  friendRequest?: string;
}
