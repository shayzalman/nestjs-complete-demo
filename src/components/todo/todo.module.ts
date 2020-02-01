import {Module} from "@nestjs/common";
import {TodoController} from "./todo.controller";
import {TodoService} from "./todo.service";
import {MongooseModule} from "@nestjs/mongoose";
import {TodoSchema} from "./model/todo.schema";
import {HttpHelper} from "../../shared/httpHelper";

@Module({
  imports: [MongooseModule.forFeature([{ name: "Todo", schema: TodoSchema }])],
  controllers: [TodoController],
  providers: [TodoService, HttpHelper]
})
export class TodoModule {}
