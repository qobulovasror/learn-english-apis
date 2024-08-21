import express, { Express } from "express";
import cors from 'cors';
import bodyParser from "body-parser";

// import routes
import home from './home'
import IrregularVerbs from './irregular_verb';
import CefrWords from './CEFR_words';
import essensial_words from './essensial_words';
import idioms from './ideoms';

export default function Routes(app: Express){
    //middlewares
    app.use(bodyParser.urlencoded({extended: true}));
    app.use(bodyParser.json());
    app.use(cors())
    app.use(express.static('public'));

    //routes
    app.use('/', home);
    app.use('/api/irregular', IrregularVerbs);
    app.use('/api/cefrWords', CefrWords);
    app.use('/api/essensialWords', essensial_words);
    app.use('/api/idioms', idioms);
}



/*

APIs

1. so'zlar inglizcha o'zbekcha
++ 2. noto'g'ri fellar jadvali
3. Destination
++ 4. CEFR words
++ 5. Essensial words
6. synonyms
++7. idioms

*/