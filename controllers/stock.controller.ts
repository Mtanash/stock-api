import { Request, Response, NextFunction } from "express";
import mongoose from "mongoose";
import Stock from "../models/stock.model";

export const addNewStock = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const stock = req.body;

    await Stock.create(stock);

    res.status(201).json({ message: "Stock created successfully." });
  } catch (error) {
    next(error);
  }
};

export const getAllStocks = async (
  _: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const stocks = await Stock.find();

    res.status(200).json({ data: stocks });
  } catch (error) {
    next(error);
  }
};

export const deleteStock = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const stockId = req.params.stockId;

    if (!mongoose.Types.ObjectId.isValid(stockId))
      throw new Error("Please provide a valid item id");

    if (!(await Stock.findById(stockId))) throw new Error("Stock not found");

    await Stock.findByIdAndDelete(stockId);

    res.status(200).json({ message: "Stock deleted successfully." });
  } catch (error) {
    next(error);
  }
};
