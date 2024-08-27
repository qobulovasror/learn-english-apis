import { Router, Request, Response, NextFunction } from "express";

const router = Router();

router.get("/", async(req, res, next )=> {
  try {
    return res.redirect("/docs")
  } catch (error) {
    next(error)
  }
})

export default router