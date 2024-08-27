import { Router, Request, Response, NextFunction } from "express";
import _ from 'underscore'
import { CustomError } from "../helper/CustomError";

interface IEssentialWords {
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

const data: IEssentialWords[] = require('../data/essential_words.json'); 

const router = Router()
/**
 * @openapi
 * /api/essentialWords:
 *      get:
 *          tags: 
 *          - Essensial words
 *          description: Get the list of words
 *          responses:
 *               200:
 *                    description: list of words
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
 * /api/essentialWords/query:
 *      get:
 *          tags:
 *          - Essensial words
 *          description: Get the list of words by query
 *          parameters:
 *            - in: query
 *              name: translation
 *              schema:
 *                type: string
 *                required: false
 *                description: translation of an word
 *            - in: query
 *              name: type
 *              schema:
 *                type: string
 *                required: false
 *                description: type of words
 *            - in: query
 *              name: book number
 *              schema:
 *                type: number
 *                required: false
 *                description: book number of word
 *            - in: query
 *              name: unit number
 *              schema:
 *                type: number
 *                required: false
 *                description: unit number of word
 *          responses:
 *               200:
 *                    description: list of words
 *               500:
 *                    description: Internal server error
 *               404:
 *                    description: not found
 */
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
    if(words.length < 1) 
      throw new res.error(404, "not found");
    res.json(words)
  }catch(ex){
    next(ex)
  }
})

// ==== get data by name ======
/**
 * @openapi
 * /api/essentialWords/{name}:
 *      get:
 *          tags: 
 *          - Essensial words
 *          description: Get the list of words by name 
 *          parameters:
 *            - name: name
 *              in: path
 *              schema:
 *                type: string
 *                required: true
 *                description: name of the word
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
    const word = data.filter((item) => item.name.toLowerCase().includes(req.params.name.toLowerCase()))
    if(word.length < 1 ) 
      throw new res.error(404, "not found");
    res.json(word)
  }catch(ex){
    console.log(ex);
    
    next(ex)
  }
})


export default router;