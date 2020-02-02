import {IsEmail, IsNotEmpty, IsString, MaxLength, MinLength} from 'class-validator';
import {ApiProperty} from '@nestjs/swagger';

export class CreateForgotPasswordDto {
    @ApiProperty({
      example: 'pejman@gmail.com',
      description: 'The email of the User',
      format: 'email',
      uniqueItems: true,
      minLength: 5,
      maxLength: 255,
    })
    @IsNotEmpty()
    @IsString()
    @MinLength(5)
    @MaxLength(255)
    @IsEmail()
    readonly email: string;
  }
