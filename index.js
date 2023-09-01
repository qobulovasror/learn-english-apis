const app = require('express')();

// require('./startup/dbConnection')()
require('./startup/router')(app)

const port = process.env.PORT || 5000;
app.listen(port, ()=>{
    console.log(`server is running on port ${port}`);
});