import {IsEmail, IsNotEmpty, IsString, MaxLength, MinLength} from "class-validator";
import {ApiProperty} from "@nestjs/swagger";

export class LoginUserDto {
  @ApiProperty({
    example: "abc@dfg.com",
    description: "The email of the User",
    format: "email",
    uniqueItems: true,
    minLength: 5,
    maxLength: 255
  })
  @IsNotEmpty()
  @IsString()
  @MinLength(5)
  @MaxLength(255)
  @IsEmail()
  readonly email: string;

  @ApiProperty({
    example: "123123",
    description: "The password of the User",
    format: "string",
    minLength: 5,
    maxLength: 1024
  })
  @IsNotEmpty()
  @IsString()
  @MinLength(5)
  @MaxLength(1024)
  readonly password: string;
}
