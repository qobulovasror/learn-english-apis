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

// ==== get all data ======
/**
 * @openapi
 * /api/irregular:
 *      get:
 *          tags:
 *          - Irregular verbs
 *          description: Get all irregular verbs
 *          responses:
 *               200:
 *                    description: list of verbs
 *               500:
 *                    description: Internal server error
 */
router.get('/', async (req: Request, res: Response, next: NextFunction)=>{
  try {
    res.status(200).json(data)
  }catch(ex){
    next(ex)
  }
})


// ==== get data by query ======
/**
 * @openapi
 * /api/irregular/query:
 *      get:
 *          tags:
 *          - Irregular verbs
 *          description: Get irregular verbs by query
 *          parameters:
 *            - in: query
 *              name: infinitive
 *              schema:
 *                type: string
 *                required: false
 *                description: infinitive form of an irregular verb
 *            - in: query
 *              name: past simple
 *              schema:
 *                type: string
 *                required: false
 *                description: the past simple form of an irregular verb
 *            - in: query
 *              name: past participle
 *              schema:
 *                type: string
 *                required: false
 *                description: the past participle form of an irregular verb
 *          responses:
 *               200:
 *                    description: list of verbs
 *               500:
 *                    description: Internal server error
 *               404:
 *                    description: not found
 */
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


// ==== get data by name ======
/**
 * @openapi
 * /api/irregular/{infinitive}:
 *      get:
 *          tags:
 *          - Irregular verbs
 *          description: Get irregular verbs by only infinitive form
 *          parameters:
 *            - name: infinitive
 *              in: path
 *              schema:
 *                type: string
 *                required: true
 *                description: infinitive form of an irregular verb
 *          responses:
 *               200:
 *                    description: list of verbs
 *               500:
 *                    description: Internal server error
 *               404:
 *                    description: not found
 */
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