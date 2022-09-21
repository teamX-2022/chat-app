import { ObjectId } from 'mongodb';
import { prop } from '@typegoose/typegoose';
import { Field, ID, ObjectType } from 'type-graphql';

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
    // @prop({required: true, trim: true, unique: true})
    @prop()
    email: string;

    @Field()
    @prop()
    username!: string;
    @prop()
    password!: string;

    @Field()
    @prop({ default: 0 })
    tokenVersion: number;
}
