require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const { errors } = require('celebrate');
const helmet = require('helmet');

const mainErrorHandler = require('./middlewares/main-error-handler');
const { requestLogger, errorLogger } = require('./middlewares/Logger');
const cors = require('./middlewares/cors');
const {
  PORT_NUMBER,
} = require('./utils/constants');
const rateLimiter = require('./middlewares/rateLimiter');
const indexRouter = require('./routes');

const { PORT = PORT_NUMBER, MONGO_DB_ADDRESS } = process.env;
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(helmet());
app.use(cors);
app.use(requestLogger);
app.use(express.json());

app.use(indexRouter);

app.use(errorLogger);
app.use(rateLimiter);

mongoose.connect(MONGO_DB_ADDRESS, {
  useNewUrlParser: true,
});

app.use(errors());
app.use(mainErrorHandler);

app.listen(PORT);
