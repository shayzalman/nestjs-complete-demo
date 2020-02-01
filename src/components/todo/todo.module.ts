import {Module} from "@nestjs/common";
import {TodoController} from "./todo.controller";
import {TodoService} from "./todo.service";
import {MongooseModule} from "@nestjs/mongoose";
import {TodoSchema} from "./model/todo.schema";
import {HttpHelper} from "../../shared/httpHelper";
import {ResponseDto} from "../../shared/response.dto";

@Module({
  imports: [MongooseModule.forFeature([{ name: "Todo", schema: TodoSchema }])],
  controllers: [TodoController],
  providers: [TodoService, HttpHelper, ResponseDto]
})
export class TodoModule {}
