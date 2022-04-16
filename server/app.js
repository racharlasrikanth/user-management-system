require('dotenv').config();
require('express-async-errors');

// express
const express = require('express');
const app = express();


// database
const connectDB = require('./database/connect');


// middlewares
const notFoundMiddleware = require('./middlewares/not-found');
const errorHandlerMiddleware = require('./middlewares/error-handler');


// rest of packages
const morgan = require('morgan');


// security packages and loggers
app.use(morgan('tiny'));


// route middlewares
app.get('/', (req, res) => {
    res.send('Hello');
})

// middlewares
app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);


const PORT = process.env.PORT || 5000;

const start = async () => {
    try {
        await connectDB(process.env.MONGO_URI);
        console.log('CONNECTED to DB...');
        app.listen(PORT, () => {
            console.log(`Server is listening on PORT : ${PORT}`);
        })
    } catch (error) {
        console.log(error);
    }
}
start();