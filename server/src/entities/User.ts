import { ObjectId } from "mongodb";
import { index, prop } from "@typegoose/typegoose";
import { Field, ID, ObjectType } from "type-graphql";

@index({ username: 1 }, { unique: true })
@ObjectType()
export class User {
  @Field(() => ID, { nullable: true })
  readonly _id: ObjectId;

  @Field()
  @prop()
  firstName: string;

  @Field()
  @prop()
  lastName: string;

  @Field()
  @prop()
  avatar: string;
  @prop()
  @Field()
  coverPicture: string;

  @Field()
  @prop()
  username!: string;
  @prop()
  password!: string;

  @Field()
  @prop({ default: 0 })
  tokenVersion: number;
}
