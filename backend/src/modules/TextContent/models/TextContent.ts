import { Field, ID, ObjectType } from "type-graphql";

@ObjectType()
export class TextContent {

    @Field(_type => ID)
    id?: string

    @Field()
    type?: string

    @Field()
    text?: string

    @Field()
    page?: string

    @Field()
    idiom?: string

    @Field()
    imageUrl?: string

    @Field()
    createdAt?: Date

    @Field()
    updatedAt?: Date
}