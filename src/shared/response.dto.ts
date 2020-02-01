import {ApiProperty} from "@nestjs/swagger";

export class ResponseDto {
    success: boolean;
    data: any;

    @ApiProperty({
        type: String
    })
    error: String;
}