import mongoose from "mongoose";

export interface IItem {
  _id?: string;
  name: string;
  dates: {
    _id?: string;
    date: {
      month: number;
      year: number;
    };
    quantity: number;
  }[];
}

const itemSchema = new mongoose.Schema<IItem>(
  {
    name: {
      type: String,
      required: [true, "Please provide a valid name"],
      lowercase: true,
      trim: true,
    },
    dates: [
      {
        date: {
          month: {
            type: Number,
            required: [true, "Please provide a valid month"],
            min: [1, "Month date must be between 1 and 12"],
            max: [12, "Month date must be between 1 and 12"],
          },
          year: {
            type: Number,
            required: [true, "Please provide a valid year"],
          },
        },
        quantity: {
          type: Number,
          required: [true, "Please provide a valid quantity"],
          min: [1, "Quantity can not be less than 1"],
        },
      },
    ],
  },
  {
    timestamps: true,
  }
);

const Item = mongoose.model<IItem>("item", itemSchema);

export default Item;
