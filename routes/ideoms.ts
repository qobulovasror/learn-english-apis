import { Router, Request, Response, NextFunction } from "express";
import _ from 'underscore'
import { CustomError } from "../helper/CustomError";

interface IIdioms {
  id: number;
  idiom: string;
  meaning: string;
  meaning_uz: string;
  usage: string;
}

const data: IIdioms[] = require('../data/idioms.json'); 

const router = Router()

// ==== get all data ======
/**
 * @openapi
 * /api/idioms:
 *      get:
 *          tags:
 *          - Idioms
 *          description: Get all idioms
 *          responses:
 *               200:
 *                    description: list of idioms
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
 * /api/idioms/query:
 *      get:
 *          tags:
 *          - Idioms
 *          description: Get all idioms by name
 *          parameters:
 *            - in: query
 *              name: idiom
 *              schema:
 *                type: string
 *                required: false
 *                description: idiom 
 *          responses:
 *               200:
 *                    description: list of idioms
 *               500:
 *                    description: Internal server error
 *               404:
 *                    description: not found
 */
router.get('/query', async (req: Request, res: Response, next: NextFunction)=>{
  try {
    const {idiom} = req.query as {idiom: string};
    if(!idiom) next();
    const words = data.filter( (item) => {
      return !!idiom && !item.idiom.toLowerCase().includes(idiom?.toString().toLowerCase());
    })
    if(!words) 
      throw new res.error(404, "not found");
    res.json(words)
  }catch(ex){
    next(ex)
  }
})

// ==== get data by id ======
/**
 * @openapi
 * /api/idioms/{id}:
 *      get:
 *          tags:
 *          - Idioms
 *          description: Get idiom by id
 *          parameters:
 *            - in: query
 *              name: id
 *              schema:
 *                type: number
 *                required: false
 *                description: id of the idiom
 *          responses:
 *               200:
 *                    description: list of idiom
 *               500:
 *                    description: Internal server error
 *               404:
 *                    description: not found
 */
router.get('/:id', async (req: Request, res: Response, next: NextFunction)=>{
  try {
    const word = data.filter((item) => item.id === Number(req.params.id))
    if(!word) 
      throw new res.error(404, "not found");
    res.json(word)
  }catch(ex){
    console.log(ex);
    
    next(ex)
  }
})


export default router;