import { Field, ID, ObjectType } from "type-graphql";

@ObjectType()
export class User {

    @Field(_type => ID)
    id: String

    @Field()
    username: String

    @Field()
    password: String

    @Field()
    isNewUser: Boolean

    @Field()
    createdAt: Date

    @Field()
    updatedAt: Date
}