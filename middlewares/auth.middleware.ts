import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import Error from "../interfaces/error.interface";

const handleUnauthorizedError = (next: NextFunction) => {
  const error: Error = new Error("Please authenticate");
  error.status = 401;
  next(error);
};

const validateTokenMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const authHeader = req.get("authorization");

    if (authHeader) {
      const bearer = authHeader.split(" ")[0];
      const token = authHeader.split(" ")[1];

      if (!token || bearer !== "Bearer") {
        handleUnauthorizedError(next);
      } else {
        const decoded = jwt.verify(token, process.env.JWT_SECRET as string);

        if (decoded) {
          next();
        } else {
          handleUnauthorizedError(next);
        }
      }
    } else {
      handleUnauthorizedError(next);
    }
  } catch (error) {
    next(error);
  }
};

export default validateTokenMiddleware;
