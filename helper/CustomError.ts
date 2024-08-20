import { NextFunction, Request, Response } from "express";

let CustomError = class CustomError extends Error {
  code: Number = 500
  constructor(code: Number, message: string){
    super(message);
    this.code = code;
  }
}

Error()

const errorHandlerMiddleware = function errorHandlerMiddleware(error: {code: number, message: string}, req: Request, res: Response, next: NextFunction){
  res.status(error.code || 500).json({
    ok: false,
    message: error.message || "Internal server error"
  })
}

export {
  CustomError,
  errorHandlerMiddleware
}