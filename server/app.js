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
const rateLimiter = require('express-rate-limit');
const helmet = require('helmet');
const xss = require('xss-clean');
const cors = require('cors');
const mongoSanitize = require('express-mongo-sanitize');


// security packages and loggers
app.set('trust proxy');
app.use(rateLimiter({
    windowMs: 15 * 60 * 1000,
    max: 60,
}))
app.use(helmet());
app.use(cors());
app.use(xss());
app.use(mongoSanitize());

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