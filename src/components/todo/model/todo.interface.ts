import {Document} from "mongoose";

export interface TodoInterface extends Document {
  readonly status: boolean;
  readonly title: string;
  created_at?: string;
  created_by?: string;
}
