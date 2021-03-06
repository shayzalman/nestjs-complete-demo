import {HttpException, Injectable} from "@nestjs/common";
import {InjectModel} from "@nestjs/mongoose";
import {TodoInterface} from "./model/todo.interface";
import {Model} from "mongoose";
import {TodoDto} from "./model/todo.dto";
import {TodoInput} from "./model/todo.gql.args";

@Injectable()
export class TodoService {
  constructor(
    @InjectModel("Todo") private readonly todoModel: Model<TodoInterface>
  ) {}

  async getAll(): Promise<TodoInterface[]> {
    try {
      return await this.todoModel.find().exec();
    } catch (e) {
      throw new HttpException(
        "Unable to load items.\nAdditional error info: " + e.message,
        404
      );
    }
  }

  async create(todo: TodoDto | TodoInput): Promise<TodoInterface> {
    try {
      todo.created_at = Date().toString();
      todo.created_by = "shay zalman";
      const create = new this.todoModel(todo);
      return create.save();
    } catch (e) {
      throw new HttpException(
        "Saving item failed.\nAdditional error info: " + e.message,
        500
      );
    }
  }

  async delete(id: String): Promise<String | boolean> {
    try {
      const ret = await this.todoModel.deleteOne({ _id: id }).exec();
      return ret.n === 1 ? id : false;
    } catch (e) {
      throw new HttpException(
        "Unable to delete item.\nAdditional error info: " + e.message,
        500
      );
    }
  }

  async getOne(id: String): Promise<TodoInterface> {
    try {
      return await this.todoModel.findById({ _id: id }).exec();
    } catch (e) {
      throw new HttpException(
        "Unable to find item.\nAdditional error info: " + e.message,
        500
      );
    }
  }

  async update(todo: TodoInterface | TodoInput): Promise<any> {
    try {
      todo.created_at = Date().toString();
      todo.created_by = "shay zalman";
      return await this.todoModel.updateOne({ _id: todo._id }, todo).exec();
    } catch (e) {
      throw new HttpException(
        "Unable to update the item.\nAdditional error info: " + e.message,
        500
      );
    }
  }
}
