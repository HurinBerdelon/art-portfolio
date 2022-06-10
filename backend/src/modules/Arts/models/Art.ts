import { Field, ID, ObjectType } from "type-graphql";

@ObjectType()
export class Art {

    @Field(_type => ID)
    id?: string

    @Field()
    title?: string

    @Field()
    category?: string

    @Field()
    description?: string

    @Field()
    image?: string

    @Field()
    dimension?: string

    @Field()
    uniqueCode?: string

    @Field()
    productionDate?: Date

    @Field()
    createdAt?: Date

    @Field()
    updatedAt?: Date
}