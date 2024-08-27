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


// ==== get all data ======
/**
 * @openapi
 * /api/cefrWords:
 *      get:
 *          tags:
 *          - CEFR words
 *          description: Get all cefr words
 *          responses:
 *               200:
 *                    description: list of words
 *               500:
 *                    description: Internal server error
 */
router.get('/', async (req: Request, res: Response, next: NextFunction)=>{
  try {
    res.json(data)
  }catch(ex){
    next(ex)
  }
})


// ==== get data by query ======
/**
 * @openapi
 * /api/cefrWords/query:
 *      get:
 *          tags:
 *          - CEFR words
 *          description: Get cefr words by query params
 *          parameters:
 *            - in: query
 *              name: translate
 *              schema:
 *                type: string
 *                required: false
 *                description: translate of words
 *            - in: query
 *              name: level
 *              schema:
 *                type: string
 *                required: false
 *                description: level of the words
 *          responses:
 *               200:
 *                    description: list of words
 *               500:
 *                    description: Internal server error
 *               404:
 *                    description: not found
 */
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


// ==== get data by name ======
/**
 * @openapi
 * /api/cefrWords/{name}:
 *      get:
 *          tags:
 *          - CEFR words
 *          description: Get cefr words by name
 *          parameters:
 *            - name: name
 *              in: path
 *              schema:
 *                type: string
 *                required: true
 *                description: name of the words
 *          responses:
 *               200:
 *                    description: list of words
 *               500:
 *                    description: Internal server error
 *               404:
 *                    description: not found
 */
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