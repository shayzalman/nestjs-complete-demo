import {Field, Int, ObjectType} from "type-graphql";

@ObjectType()
export class TodoGqlObject {
  @Field(type => String)
  _id: string;

  @Field(type => Int)
  status: number;

  @Field({ nullable: false, description: "this is the title field" })
  title: string;

  @Field({ nullable: true, description: "this is the created time field" })
  created_at?: string;

  @Field({ nullable: true, description: "this is the created by field" })
  created_by?: string;
}
