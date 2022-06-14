import { Field, ID, ObjectType } from "type-graphql";
import { Translation } from "../../Translations/models/Translation";

@ObjectType()
export class Category {

    @Field(_type => ID)
    id?: string

    @Field()
    title?: string

    @Field(type => [Translation])
    Translations: Translation[]

    @Field()
    createdAt?: Date
}