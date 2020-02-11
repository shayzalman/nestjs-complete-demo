import {ArgsType, Field, InputType, Int} from "type-graphql";
import {IsOptional, Length, MaxLength} from "class-validator";

@ArgsType()
export class TodoArgs {
  @Field(type => String, { name: "id" })
  id: string;
}

@InputType()
export class TodoInput {
  @IsOptional()
  @Field({ nullable: true, description: "this is an optional id field" })
  _id?: string;

  @Field(type => Int)
  @Length(1, 1)
  status: number;

  @MaxLength(128)
  @Field({ nullable: false, description: "this is the title field" })
  title: string;

  @IsOptional()
  @Field({ nullable: true, description: "this is the created time field" })
  created_at?: string;

  @IsOptional()
  @Field({ nullable: true, description: "this is the created by field" })
  created_by?: string;
}
