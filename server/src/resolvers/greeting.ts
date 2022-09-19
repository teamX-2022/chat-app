import { Query, Resolver } from "type-graphql";
import 'reflect-metadata'

@Resolver()
export class GreetingResolve{
    @Query()
    hello(): string {
        return "hello world"
    }
}