import {TodoSchema} from "./model/todo.schema";
import {MongoMemoryServer} from "mongodb-memory-server";

const mongoose = require("mongoose");
const todoModel = new mongoose.model("Todo", TodoSchema);

async function getMongo() {
  const mongod = new MongoMemoryServer();
  return await mongod.getUri();
}

// @ts-ignore
const todoData = {
  id: "asddasd",
  title: "Jane Doe",
  status: true,
  created_at: "Wed Jan 29 2020 10:23:57 GMT+0200 (Israel Standard Time)",
  created_by: "shay zalman"
};

describe("Todo Model Test", () => {
  // connect to the MongoDB Memory Server
  beforeAll(async () => {
    await getMongo().then(connection => {
      mongoose.connect(
        connection,
        {
          useNewUrlParser: true,
          useCreateIndex: true,
          useUnifiedTopology: true
        },
        err => {
          if (err) {
            console.error(err);
            process.exit(1);
          }
        }
      );
    });
  });

  it("create & save successfully", async () => {
    const validItem = new todoModel(todoData);
    const savedItem = await validItem.save();
    expect(savedItem._id).toBeDefined();
    expect(savedItem.title).toBe(todoData.title);
    expect(savedItem.status).toBe(todoData.status);
    expect(savedItem.created_at).toBe(todoData.created_at);
    expect(savedItem.created_by).toBe(todoData.created_by);
  });

  it("insert item successfully, but with a foreign and invalid field", async () => {
    const todoWithInvalidField = new todoModel({
      title: "testing",
      status: true,
      date: Date().toString()
    });
    const savedItemWithInvalidField = await todoWithInvalidField.save();
    expect(savedItemWithInvalidField._id).toBeDefined();
    expect(typeof savedItemWithInvalidField.status).toBe("boolean");
    expect(savedItemWithInvalidField.date).toBeUndefined();
  });

  it("create user without required field should failed", async () => {
    const todoWithoutRequiredField = new todoModel({ title: "test" });
    try {
      await todoWithoutRequiredField.save();
    } catch (error) {
      expect(error).toBeInstanceOf(mongoose.Error.ValidationError);
      expect(error.errors.status).toBeDefined();
    }
  });
});
