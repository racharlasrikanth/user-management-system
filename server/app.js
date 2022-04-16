require('dotenv').config();
require('express-async-errors');

// express
const express = require('express');
const app = express();


// database
const connectDB = require('./database/connect');


// rest of packages
const morgan = require('morgan');


// security packages and loggers
app.use(morgan('tiny'));


// route middlewares
app.get('/', (req, res) => {
    res.send('Hello');
})


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