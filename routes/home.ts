import { Router, Request, Response, NextFunction } from "express";

const router = Router();

router.get("/", async(req, res, next )=> {
  try {
    return res.render("index2.html")
  } catch (error) {
    next(error)
  }
})

export default router