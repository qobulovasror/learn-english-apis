import { Router, Request, Response, NextFunction } from "express";


interface ICefrWords {
  id: number;
  name: string;
  translate: string;
  level: "a1" | "a2" | "b1" | "b2" | "c1" | "c2";
  type: string;
  definition: string;
  voice: string;
}
const data: ICefrWords[] = require('../data/CEFR_words.json'); 


const router = Router()

router.get('/', async (req: Request, res: Response, next: NextFunction)=>{
  try {
    res.json(data)
  }catch(ex){
    next(ex)
  }
})

router.get('/query/', async (req: Request, res: Response, next: NextFunction)=>{
  try {
    const {translate, level} = req.query;
    if(!translate && !level) next();
    
    const word = data.filter( (item) => {
      if (translate && level)
        return item.translate.toLowerCase().includes(translate?.toString().toLowerCase()) && item.level.toLowerCase() == level?.toString().toLowerCase() 
      if (translate)
        return item.translate.toLowerCase().includes(translate?.toString().toLowerCase())
      if (level)
        return item.level.toLowerCase() == level?.toString().toLowerCase()
    })
    if(!word) throw new res.error(404, "not found");
    res.json(word)
  }catch(ex){
    next(ex)
  }
})

router.get('/:name', async (req: Request, res: Response, next: NextFunction)=>{
  try {
    const word = data.filter( (item) => item.name.toLowerCase().includes(req.params.name.toLowerCase()))
    if(!word) throw new res.error(404, "not found");
    res.json(word)
  }catch(ex){
    next(ex)
  }
})


export default router;