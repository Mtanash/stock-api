import { Types } from "mongoose";

export interface Date {
  _id?: string;
  date: {
    month: number;
    year: number;
  };
  quantity: number;
}
