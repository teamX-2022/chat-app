import { Field, InputType } from "type-graphql"

@InputType()
export class LoginInput{
    @Field()
    email: string
    @Field()
    username: string
    @Field()
    password: string
}