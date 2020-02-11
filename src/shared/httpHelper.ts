import {Injectable} from "@nestjs/common";
import {ResponseDto} from "./response.dto";

@Injectable()
export class HttpHelper {
  handleResponse(status: boolean, data?: any): ResponseDto {
    return {
      success: status,
      data: data,
      error: ""
    };
  }
}
