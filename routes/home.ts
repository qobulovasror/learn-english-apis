import { Router, Request, Response, NextFunction } from "express";

const router = Router();

router.get("/", async(req, res, next )=> {
  try {
    res.render("index.html")
  } catch (error) {
    next(error)
  }
})

export default router