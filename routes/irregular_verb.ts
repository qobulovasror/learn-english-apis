import { Router, Request, Response, NextFunction } from "express";

interface IIrregularVerb {
  infinitive: string;
  past_simple: string;
  past_participle: string;
  meaning: string;
  note: string | null;
  translation: string;
}

interface IQuery {
  infinitive: string;
  past_simple: string;
  past_participle: string;
}


const data: IIrregularVerb[] = require('../data/irregular_verb.json'); 

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
    const {infinitive, past_simple, past_participle} = req.query as unknown as IQuery;
    if(!infinitive && !past_simple && !past_participle) next();
    
    const words = data.filter( (item) => {
      if(!!infinitive && !item.infinitive.toLowerCase().includes(infinitive?.toString().toLowerCase()))
        return false;
      if(!!past_simple && !item.past_simple.toLowerCase().includes(past_simple?.toString().toLowerCase()))
        return false;
      if(!!past_participle && item.past_participle.toString() != past_participle.toString())
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
    const word = data.filter((item) => item.infinitive.toLowerCase().includes(req.params.name.toLowerCase()))
    if(!word) 
      throw new res.error(404, "not found");
    res.json(word)
  }catch(ex){
    console.log(ex);
    
    next(ex)
  }
})

export default router;