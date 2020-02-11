import {Document} from "mongoose";

export interface TodoInterface extends Document {
  readonly status: number;
  readonly title: string;
  created_at?: string;
  created_by?: string;
}
