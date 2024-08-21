import { Router, Request, Response, NextFunction } from "express";
import _ from 'underscore'
import { CustomError } from "../helper/CustomError";

interface IEssensialWords {
  id: number;
  name: string;
  transcription: string;
  translation: string;
  example: string;
  description: string;
  type: string;
  book_num: number;
  unit_num: number;
  sefr_level: null;
}

interface IQuery {
  translation: string;
  type: string;
  book_num: number;
  unit_num: number
}

const data: IEssensialWords[] = require('../data/essantial_words.json'); 

const router = Router()

router.get('/', async (req: Request, res: Response, next: NextFunction)=>{
  try {
    res.json(data)
  }catch(ex){
    next(ex)
  }
})

router.get('/query', async (req: Request, res: Response, next: NextFunction)=>{
  try {
    const {translation, type, book_num, unit_num} = req.query as unknown as IQuery;
    if(!translation && !type && !book_num && !unit_num) next();
    const words = data.filter( (item) => {
      if(!!translation && !item.translation.toLowerCase().includes(translation?.toString().toLowerCase()))
        return false;
      if(!!type && !item.type.toLowerCase().includes(type?.toString().toLowerCase()))
        return false;
      if(!!book_num && item.book_num.toString() != book_num.toString())
        return false;
      if(!!unit_num && item.unit_num.toString() != unit_num.toString())
        return false;
      return true;
    })
    if(!words) 
      throw new res.error(404, "not found");
    res.json(words)
  }catch(ex){
    next(ex)
  }
})

router.get('/:name', async (req: Request, res: Response, next: NextFunction)=>{
  try {
    const word = data.filter((item) => item.name.toLowerCase().includes(req.params.name.toLowerCase()))
    if(!word) 
      throw new res.error(404, "not found");
    res.json(word)
  }catch(ex){
    console.log(ex);
    
    next(ex)
  }
})


export default router;