import { ObjectId } from 'mongodb';
import { index, prop } from '@typegoose/typegoose';
import { Field, ID, ObjectType } from 'type-graphql';

@index({ username: 1 }, { unique: true })
@ObjectType()
export class User {
    @Field(() => ID, { nullable: true })
    readonly _id: string;

    @Field()
    @prop()
    name: string;

    @Field()
    @prop({ default: null })
    avatar: string;
    @Field()
    @prop({ default: null })
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
