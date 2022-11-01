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

const { MONGO_DB_ADDRESS, NODE_ENV } = process.env;
const { MONGO_DB_ADDRESS_DEV } = require('./utils/constants');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(cors);
app.use(requestLogger);
app.use(rateLimiter);
app.use(helmet());

app.use(express.json());
app.use(indexRouter);
app.use(errorLogger);

mongoose.connect(NODE_ENV === 'production' ? MONGO_DB_ADDRESS : MONGO_DB_ADDRESS_DEV, {
  useNewUrlParser: true,
});

app.use(errors());
app.use(mainErrorHandler);

app.listen(PORT_NUMBER);
