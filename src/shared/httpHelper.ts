import {Injectable} from "@nestjs/common";

export class ResponseObj {
    success: boolean;
    data: any;
    error: String;
}

@Injectable()
export class HttpHelper {
    handleResponse(status: boolean, data?: any): ResponseObj{
        return {
            success: status,
            data: data,
            error: ""
        };
    }
}