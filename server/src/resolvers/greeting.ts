import { Context } from "../types/Context";
import { checkAuth } from "../middleware/checkAuth";
import { Ctx, Query, Resolver, UseMiddleware, ID } from "type-graphql";
import "reflect-metadata";
import { UserModel } from "../models/Model";

@Resolver()
export class GreetingResolve {
  @Query((_return) => String)
  @UseMiddleware(checkAuth)
  async hello(@Ctx() { user }: Context): Promise<string> {
    const existingUser = await UserModel.findOne({ _id: user.userId });
    // console.log(user);

    return `hello ${existingUser?.username} world`;
  }
}
