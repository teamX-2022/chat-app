import {prop} from '@typegoose/typegoose'
import { Field, ID, ObjectType } from 'type-graphql'

@ObjectType()
export class User {
    @Field(() => ID)
    _id: string;
    @Field()
    @prop()
    firstName: string

    @Field()
    @prop()
    lastName: string

    @Field()
    @prop()
    // @prop({required: true, trim: true, unique: true})
    email: string

    @Field()
    @prop({required: true, trim: true, unique: true})
    username!: string

    @prop({required: true})
    password!: string

}
