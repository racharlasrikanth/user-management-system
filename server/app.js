require('dotenv').config();
require('express-async-errors');

// express
const express = require('express');
const app = express();


// database
const connectDB = require('./database/connect');

// routers
const authRouter = require('./routes/authRoutes');
const userRouter = require('./routes/userRoutes');

// middlewares
const notFoundMiddleware = require('./middlewares/not-found');
const errorHandlerMiddleware = require('./middlewares/error-handler');


// rest of packages
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const fileUpload = require('express-fileupload');


// security packages and loggers
app.use(morgan('tiny'));
// access data from body
app.use(express.json());
app.use(cookieParser(process.env.JWT_SECRET));

app.use(fileUpload());


// route middlewares
app.get('/', (req, res) => {
    res.send('Hello');
})

app.use('/api/v1/auth', authRouter);
app.use('/api/v1/users', userRouter);

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