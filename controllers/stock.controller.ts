import { Request, Response, NextFunction } from "express";
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
  req: Request,
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
