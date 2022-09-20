import { NextFunction, Request, Response } from "express";
import Item from "../models/item.model";
import { Item as ItemInterface } from "../interfaces/item.interface";
import { Date } from "../interfaces/date.interface";
import mongoose, { Types } from "mongoose";
import Stock from "../models/stock.model";

export const addNewItem = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const item: ItemInterface = req.body;
    // validate item
    const stock = await Stock.findById(item.stock.toString());
    if (!stock) throw new Error("No stock found for this id.");

    // check if item already exists
    const itemExist = await Item.findOne({
      name: item.name.toLowerCase().trim(),
    });
    if (!itemExist) {
      await Item.create({
        name: item.name,
        stock: item.stock,
        dates: [
          {
            date: item.date,
            quantity: item.quantity,
          },
        ],
      });
      res.status(201).json({ message: "Item added successfully." });
    } else {
      res.status(404).json({ message: "Item already exists." });
    }
  } catch (error) {
    next(error);
  }
};

export const getAllItems = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { stock } = req.query;
    const queryObject: { stock?: string } = {};

    if (stock) {
      queryObject.stock = stock.toString();
    }

    const result = Item.find(queryObject);

    result.sort("name");

    const items = await result;

    res.status(200).json({ data: items });
  } catch (error) {
    next(error);
  }
};

export const addNewDateToItem = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const itemId = req.params.itemId;
    if (!mongoose.Types.ObjectId.isValid(itemId))
      throw new Error("Please provide a valid id");

    const newDate: Date = req.body;

    const item = await Item.findById(itemId);
    if (!item) throw new Error("Item not found");

    item.dates.push(newDate);
    await item.save();

    res.status(200).json({ message: "New date added successfully." });
  } catch (error) {
    next(error);
  }
};

export const deleteItem = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const itemId = req.params.itemId;
    if (!mongoose.Types.ObjectId.isValid(itemId))
      throw new Error("Please provide a valid id");

    if (!(await Item.findById(itemId))) throw new Error("Item not found");

    await Item.findByIdAndDelete(itemId);

    res.status(200).json({ message: "Item deleted successfully." });
  } catch (error) {
    next(error);
  }
};

export const updateItemName = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const itemId = req.params.itemId;
    const newName = req.body?.name;

    const item = await Item.findById(itemId);
    if (!item) throw new Error("Item not found");
    item.name = newName;
    await item.save();

    res.status(200).json({ message: "Item updated successfully." });
  } catch (error) {
    next(error);
  }
};

export const deleteDate = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const itemId = req.params.itemId;
    const dateId = req.params.dateId;

    if (!mongoose.Types.ObjectId.isValid(itemId))
      throw new Error("Please provide a valid item id");
    if (!mongoose.Types.ObjectId.isValid(dateId))
      throw new Error("Please provide a valid date id");

    const item = await Item.findById(itemId);
    if (!item) throw new Error("Item not found");

    const dateIndex = item.dates.findIndex(
      (date) => date._id?.toString() === dateId
    );
    if (dateIndex < 0) throw new Error("Date not found");

    item.dates = item.dates.filter((_date, index) => index !== dateIndex);
    await item.save();

    res.status(200).json({ message: "Date deleted successfully." });
  } catch (error) {
    next(error);
  }
};
