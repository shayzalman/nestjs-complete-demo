import {Body, Controller, Delete, Get, Param, Patch, Post} from "@nestjs/common";
import {TodoService} from "./todo.service";
import {TodoInterface} from "./model/todo.interface";
import {HttpHelper, ResponseObj} from "../../shared/httpHelper";

@Controller("todo")
export class TodoController {
  constructor(
      private readonly todoService: TodoService,
      private readonly http: HttpHelper
      ) {}

  @Get()
  async getAll(): Promise<ResponseObj> {
    const ret = await this.todoService.getAll();
    return this.http.handleResponse(!!ret, ret);
  }

  @Post()
  async create(@Body() todo: TodoInterface) {
    const ret = await this.todoService.create(todo);
    return this.http.handleResponse(!!ret, ret);
  }

  @Delete(':id')
  async remove(@Param('id') id: String) {
    const ret = await this.todoService.delete(id);
    return this.http.handleResponse(!!ret, ret);
  }

  @Patch()
  async update(@Body() todo: TodoInterface){
    const ret = await this.todoService.update(todo);
    return this.http.handleResponse(!!ret, ret);
  }
}
