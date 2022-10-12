import mongoose, { Types } from "mongoose";

interface IStock {
  _id?: string;
  name: string;
  items: Types.ObjectId[];
}

const stockSchema = new mongoose.Schema<IStock>(
  {
    name: {
      type: String,
      required: [true, "Please provide a valid name"],
      lowercase: true,
      trim: true,
    },
    items: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "item",
      },
    ],
  },
  {
    timestamps: true,
  }
);

const Stock = mongoose.model<IStock>("stock", stockSchema);

export default Stock;
