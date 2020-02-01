import {Document} from "mongoose";

export interface TodoInterface extends Document {
  readonly status: Number;
  readonly title: String;
  created_at?: String;
  created_by?: String;
}
