import {ApiProperty} from "@nestjs/swagger";

export class TodoDto {
  @ApiProperty({
    description: "Define the status of the item"
  })
  readonly status: Boolean;

  @ApiProperty({
    description: "Define the title of the item",
    type: String
  })
  readonly title: String;

  @ApiProperty({
    description: "Define the created at date of the item",
    type: "date string",
    required: false
  })
  created_at?: String;

  @ApiProperty({
    description: "Define the created by user of the item",
    type: String,
    required: false
  })
  created_by?: String;
}
