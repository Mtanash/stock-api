import { NextFunction, Request, Response } from "express";
import mongoose from "mongoose";
import Item from "../models/item.model";
import Stock from "../models/stock.model";
import { IItem } from "./../models/item.model";

export const addNewStock = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const stockData = req.body;

    const stock = await Stock.create(stockData);

    res
      .status(201)
      .json({ message: "Stock created successfully.", data: stock });
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
    const { populated } = req.query;

    let stocks;

    if (populated && populated === "true") {
      stocks = await Stock.find().populate<{ items: IItem[] }>("items");
    } else {
      stocks = await Stock.find();
    }

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
      throw new Error("Please provide a valid stock id");

    if (!(await Stock.findById(stockId))) throw new Error("Stock not found");

    const stock = await Stock.findById(stockId);
    stock?.items.forEach(async (item) => {
      await Item.findByIdAndDelete(item._id);
    });

    await Stock.findByIdAndDelete(stockId);

    res.status(200).json({ message: "Stock deleted successfully." });
  } catch (error) {
    next(error);
  }
};

export const getStock = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const stockId = req.params.stockId;
    const { populated } = req.query;

    if (!mongoose.Types.ObjectId.isValid(stockId))
      throw new Error("Please provide a valid stock id");

    let stock;
    if (populated === "true") {
      stock = await Stock.findById(stockId).populate<{ items: IItem[] }>(
        "items"
      );
    } else {
      stock = await Stock.findById(stockId);
    }

    if (!stock) throw new Error("Stock not found");

    res.status(200).json({ data: stock });
  } catch (error) {
    next(error);
  }
};

export const getStockItems = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const stockId = req.params.stockId;

    if (!mongoose.Types.ObjectId.isValid(stockId))
      throw new Error("Please provide a valid stock id");

    const stock = await Stock.findById(stockId).populate<{ items: IItem[] }>(
      "items"
    );

    if (!stock) throw new Error("Stock not found");

    res.status(200).json({ data: stock.items });
  } catch (error) {
    next(error);
  }
};
