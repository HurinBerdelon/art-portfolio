import { Field, ID, ObjectType } from "type-graphql";

@ObjectType()
export class Translation {

    @Field(_type => ID)
    id?: string

    @Field()
    title: string

    @Field()
    language: string

    @Field()
    categoryTitle: string

    @Field()
    createdAt?: Date
}