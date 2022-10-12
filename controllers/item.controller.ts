import { NextFunction, Request, Response } from "express";
import mongoose from "mongoose";
import { Date } from "../interfaces/date.interface";
import { Item as ItemInterface } from "../interfaces/item.interface";
import Item from "../models/item.model";
import Stock from "../models/stock.model";
import { IItem } from "./../models/item.model";

export const addNewItem = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const itemData: ItemInterface = req.body;
    // validate item
    const stockId = req.body.stock;

    if (!mongoose.Types.ObjectId.isValid(stockId))
      throw new Error("Please provide a valid stock id");

    const stock = await Stock.findById(stockId).populate<{ items: IItem[] }>(
      "items"
    );

    if (!stock) throw new Error("Stock not found");

    // check if item already exists
    const itemExist = stock.items.find(
      (item) => item.name.toLowerCase() === itemData.name.toLowerCase()
    );

    if (!itemExist) {
      const createdItem = await Item.create({
        name: itemData.name,
        dates: [
          {
            date: itemData.date,
            quantity: itemData.quantity,
          },
        ],
      });

      stock.items.push(createdItem);

      await stock.save();

      res
        .status(201)
        .json({ message: "Item added successfully.", data: createdItem });
    } else {
      res.status(404).json({ message: "Item already exists." });
    }
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
    const stockId = req.params.stockId;

    if (!mongoose.Types.ObjectId.isValid(itemId))
      throw new Error("Please provide a valid item id");

    if (!mongoose.Types.ObjectId.isValid(stockId))
      throw new Error("Please provide a valid stock id");

    const newDate: Date = req.body;

    const stock = await Stock.findById(stockId).populate<{ items: IItem[] }>(
      "items"
    );
    if (!stock) throw new Error("Stock not found");

    const itemIndex = stock.items.findIndex(
      (item) => item._id?.toString() === itemId
    );

    if (itemIndex === -1) throw new Error("Item not found");

    stock.items[itemIndex].dates.push(newDate);

    await stock.save();

    res.status(200).json({
      message: "New date added successfully.",
      data: stock.items[itemIndex],
    });
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
    const stockId = req.params.stockId;

    if (!mongoose.Types.ObjectId.isValid(itemId))
      throw new Error("Please provide a valid item id");

    if (!mongoose.Types.ObjectId.isValid(stockId))
      throw new Error("Please provide a valid stock id");

    const stock = await Stock.findById(stockId);
    if (!stock) throw new Error("Stock not found");

    if (!(await Item.findById(itemId))) throw new Error("Item not found");

    const deletedItem = await Item.findByIdAndDelete(itemId);

    stock.items.filter(
      (item) => item._id.toString() !== deletedItem?._id.toString()
    );

    await stock.save();

    res
      .status(200)
      .json({ message: "Item deleted successfully.", data: deletedItem });
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

    if (!mongoose.Types.ObjectId.isValid(itemId))
      throw new Error("Please provide a valid item id");

    const item = await Item.findById(itemId);
    if (!item) throw new Error("Item not found");
    item.name = newName;
    await item.save();

    res.status(200).json({ message: "Item updated successfully.", data: item });
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

    res.status(200).json({ message: "Date deleted successfully.", data: item });
  } catch (error) {
    next(error);
  }
};

export const updateDate = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const itemId = req.params.itemId;
    const dateId = req.params.dateId;
    const newQuantity = req.body?.quantity;

    if (!mongoose.Types.ObjectId.isValid(itemId))
      throw new Error("Please provide a valid item id");

    if (!mongoose.Types.ObjectId.isValid(dateId))
      throw new Error("Please provide a valid date id");

    if (!newQuantity || newQuantity < 1)
      throw new Error("Please provide a valid quantity");

    const item = await Item.findById(itemId);
    if (!item) throw new Error("Item not found");

    const dateIndex = item.dates.findIndex(
      (date) => date._id?.toString() === dateId
    );
    if (dateIndex < 0) throw new Error("Date not found");

    item.dates[dateIndex].quantity = newQuantity;
    await item.save();

    res
      .status(200)
      .json({ message: "Date quantity updated successfully.", data: item });
  } catch (error) {
    next(error);
  }
};
