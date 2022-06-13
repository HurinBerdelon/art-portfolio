import { Field, ID, ObjectType } from "type-graphql";

@ObjectType()
export class Category {

    @Field(_type => ID)
    id?: string

    @Field()
    title?: string

    @Field()
    createdAt?: Date
}