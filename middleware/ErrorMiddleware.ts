import { Request, Response, NextFunction } from "express";
import { CustomError } from "../helper/CustomError";


declare module "express-serve-static-core" {
  interface Response {
    error?: typeof CustomError;
  }
}

export function CustomErrorMiddleware(req: Request, res: Response, next: NextFunction){
  res.error = CustomError;
  next();
}