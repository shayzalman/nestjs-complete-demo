import {TodoController} from "./todo.controller";
import {Test, TestingModule} from "@nestjs/testing";
import {TodoService} from "./todo.service";
import {HttpHelper} from "../../shared/httpHelper";
import {TodoInterface} from "./model/todo.interface";

class TodoServiceMock {
  // @ts-ignore
  private item: TodoInterface = {
    id: "asddasd",
    title: "Jane Doe",
    status: true,
    created_at: "Wed Jan 29 2020 10:23:57 GMT+0200 (Israel Standard Time)",
    created_by: "shay zalman"
  };

  getItem() {
    return this.item;
  }

  async getAll() {
    return [this.item, this.item];
  }

  async create(todo: TodoInterface) {
    return todo;
  }

  async update(todo: TodoInterface) {
    return todo;
  }

  async delete(id) {
    return id;
  }
}

describe("TodoController", () => {
  let controller: TodoController;
  let app: TestingModule;
  let mock = new TodoServiceMock();
  let _item: TodoInterface;

  beforeEach(async () => {
    const ApiServiceProvider = {
      provide: TodoService,
      useClass: TodoServiceMock
    };
    app = await Test.createTestingModule({
      controllers: [TodoController],
      providers: [TodoService, ApiServiceProvider, HttpHelper]
    }).compile();

    controller = app.get<TodoController>(TodoController);
    _item = mock.getItem();
  });

  describe("get all todo items", () => {
    it("should return response obj with data and success", async () => {
      const res = await controller.getAll();
      expect(res).toHaveProperty("data");
      expect(res).toHaveProperty("success");
    });
  });

  describe("create new todo item", () => {
    it("should mock creation of a new item", async () => {
      const res = await controller.create(_item);
      expect(res).toHaveProperty("data");
      expect(res).toHaveProperty("success");
    });
  });

  describe("update todo item", () => {
    it("should mock update item", async () => {
      const res = await controller.create(_item);
      expect(res).toHaveProperty("data");
      expect(res).toHaveProperty("success");
      expect(res.data).toStrictEqual(_item);
    });
  });

  describe("remove one item", () => {
    it("should remove one item and return success", async () => {
      let _id = "1234";
      const res = await controller.remove(_id);
      expect(res).toHaveProperty("data");
      expect(res).toHaveProperty("success");
      if (res.success === true) expect(res.data).toBe(_id);
    });
  });

  afterEach(() => {
    jest.resetAllMocks();
  });
});
