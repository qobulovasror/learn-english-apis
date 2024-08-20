import { Router, Request, Response, NextFunction } from "express";
const data = require('../data/irregular_verbs.json'); 


const router = Router()

router.get('/', async (req: Request, res: Response, next: NextFunction)=>{
  try {
    res.json(data)
  }catch(ex){
    next(ex)
  }
})

export default router;