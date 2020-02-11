import {Module} from "@nestjs/common";
import {TodoController} from "./todo.controller";
import {TodoService} from "./todo.service";
import {MongooseModule} from "@nestjs/mongoose";
import {TodoSchema} from "./model/todo.schema";
import {HttpHelper} from "../../shared/httpHelper";
import {ResponseDto} from "../../shared/response.dto";
import {TodoResolver} from "./todo.gql.resolver";
import {PubSub} from "graphql-subscriptions";

@Module({
  imports: [MongooseModule.forFeature([{ name: "Todo", schema: TodoSchema }])],
  controllers: [TodoController],
  providers: [
    TodoService,
    HttpHelper,
    ResponseDto,
    TodoResolver,
    {
      provide: "PUB_SUB",
      useValue: new PubSub()
    }
  ]
})
export class TodoModule {}
