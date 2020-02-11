import {Body, Controller, Delete, Get, Param, Patch, Post, UseGuards, UsePipes} from "@nestjs/common";
import {TodoService} from "./todo.service";
import {TodoInterface} from "./model/todo.interface";
import {HttpHelper} from "../../shared/httpHelper";
import {TodoDto} from "./model/todo.dto";
import {ResponseDto} from "../../shared/response.dto";
import {ValidateIdPipe} from "../../shared/validate-id.pipe";
import {AuthGuard} from "@nestjs/passport";
import {Roles} from "../auth/decorators/roles.decorator";

@Controller("todo")
export class TodoController {
  constructor(
    private readonly todoService: TodoService,
    private readonly http: HttpHelper
  ) {}

  @Get()
  async getAll(): Promise<ResponseDto> {
    const ret = await this.todoService.getAll();
    return this.http.handleResponse(!!ret, ret);
  }

  @Post()
  @UseGuards(AuthGuard("jwt"))
  async create(@Body() todo: TodoDto) {
    const ret = await this.todoService.create(todo);
    return this.http.handleResponse(!!ret, ret);
  }

  @Delete(":id")
  @UsePipes(ValidateIdPipe)
  @Roles("admin")
  @UseGuards(AuthGuard("jwt"))
  async remove(@Param("id") id: String) {
    const ret = await this.todoService.delete(id);
    return this.http.handleResponse(!!ret, ret);
  }

  @Patch()
  @UseGuards(AuthGuard("jwt"))
  async update(@Body() todo: TodoInterface) {
    const ret = await this.todoService.update(todo);
    return this.http.handleResponse(!!ret, ret);
  }
}
