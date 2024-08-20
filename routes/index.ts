import express, { Express } from "express";
import cors from 'cors';
import bodyParser from "body-parser";

// import routes
import IrregularVerbs from './irregular_verb';
import home from './home'
export default function Routes(app: Express){
    //middlewares
    app.use(bodyParser.urlencoded({extended: true}));
    app.use(bodyParser.json());
    app.use(cors())
    app.use(express.static('public'));

    //routes
    app.use('/', home);
    app.use('/api/irregular', IrregularVerbs);
}