// import packages from node_modules
import express, {Express} from 'express'
import dotenv from 'dotenv'

dotenv.config()

// import packages from file
import Routes from './routes'
import { errorHandlerMiddleware } from './helper/CustomError';
import { CustomErrorMiddleware } from './middleware/ErrorMiddleware';

async function run(){
  try {
    const app:Express = express();
    const port = process.env.PORT || 5000;
    app.listen(port, ()=>{
      console.log(`Server running on port http://localhost:${port}/`);
    })
  
    app.use(CustomErrorMiddleware);
    
    Routes(app)

    app.use(errorHandlerMiddleware);
    
  } catch (error) {
    console.log(error);
    process.exit(1)
  }
}

run().then()