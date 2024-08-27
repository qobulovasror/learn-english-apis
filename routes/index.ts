import express, { Express } from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';

// import routes
import home from './home';
import IrregularVerbs from './irregular_verb';
import CefrWords from './CEFR_words';
import essensial_words from './essensial_words';
import idioms from './ideoms';

export default function Routes(app: Express) {
  //middlewares
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(bodyParser.json());
  app.use(cors());
  // app.use(express.static('public'));

  // Swagger Page

  const swaggerSpec = swaggerJsdoc(options);
  app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
  // Documentation in JSON format
  app.get('/docs.json', (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    res.send(swaggerSpec);
  });

  //routes
  app.use('/', home);
  app.use('/api/irregular', IrregularVerbs);
  app.use('/api/cefrWords', CefrWords);
  app.use('/api/essentialWords', essensial_words);
  app.use('/api/idioms', idioms);
}

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Learn English API',
      description:
        'API endpoints for an english word services documented on swagger',
      contact: {
        name: 'Qobulov Asror',
        email: 'qobulovasror0@gmail.com',
        url: 'https://github.com/qobulovasror/learn-english-apis',
      },
      version: '1.0.0',
    },
    servers: [
      {
        url: 'http://localhost:5000/',
        description: 'Local server',
      },
      {
        url: 'http://localhost:8080/',
        description: 'Live server',
      },
    ],
  },
  apis: ['./routes/*.ts'],
};

/*

APIs

++ 1. noto'g'ri fellar jadvali
++ 2. CEFR words
++ 3. Essensial words
++ 4. idioms
5. so'zlar inglizcha o'zbekcha
6. Destination
7. synonyms

*/
