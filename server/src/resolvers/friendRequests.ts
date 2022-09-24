import { FriendRequestModel } from "../models/Model";
import { Arg, Mutation, Resolver } from "type-graphql";
import { FriendRequestMutationResponse } from "../types/FriendRequestMutationResponse";
import { FriendRequestInput } from "../types/FriendRequestInput";
import { FriendRequest } from "../entities/FriendRequest";

@Resolver()
export class FriendRequestResolver {
  @Mutation((_return) => FriendRequestMutationResponse)
  async sendRequest(
    @Arg("friendRequestInput") { userId, requestId }: FriendRequestInput
  ): Promise<FriendRequestMutationResponse> {
    const existingRequest = await FriendRequestModel.findOne({
      userId,
      requestId,
    });
    if (existingRequest) {
      throw new Error("duplicated invite to friend");
    }

    const newRequest = await FriendRequestModel.create({
      userId,
      requestId,
    });
    const response = await newRequest.save();

    console.log(response.requestId, "invited to friend");
    return {
      code: 200,
      success: true,
      message: "success send to request friend",
      friendRequest: response.requestId as string,
    };
  }
}
