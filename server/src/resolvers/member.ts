import { Member } from "../entities/Member";
import { Arg, Mutation, Resolver } from "type-graphql";
import { FriendResolver } from "./friend";
import { MemberModel } from "../models/Model";

@Resolver()
export class MemberResolver {
  @Mutation((_return) => Member)
  async addMember(
    @Arg("name") name: string,
    @Arg("conversationId") conversationId: string,
    @Arg("userId") userId: string
  ): Promise<Member> {
    if (name.length > 0 && conversationId.length > 0 && userId.length > 0) {
      const member = await MemberModel.create({
        name,
        conversationId,
        userId,
      });
      return await member.save();
    }

    throw new Error("params invalid");
  }
}
