import mongoose from "mongoose";

interface IStock {
  _id?: string;
  name: string;
}

const stockSchema = new mongoose.Schema<IStock>({
  name: {
    type: String,
    required: [true, "Please provide a valid name"],
    lowercase: true,
    trim: true,
  },
});

const Stock = mongoose.model<IStock>("stock", stockSchema);

export default Stock;
