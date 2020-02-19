import * as mongoose from "mongoose";

export const TodoSchema = new mongoose.Schema({
  status: {
    type: Boolean,
    required: true
  },
  title: {
    type: String,
    required: true
  },
  created_at: String,
  created_by: String
});
