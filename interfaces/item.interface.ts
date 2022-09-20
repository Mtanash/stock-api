import { Types } from "mongoose";

export interface Item {
  _id?: string;
  stock: Types.ObjectId;
  name: string;
  quantity: number;
  date: {
    month: number;
    year: number;
  };
}
