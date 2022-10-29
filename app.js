require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const { errors } = require('celebrate');
const helmet = require('helmet');
const users = require('./routes/users');
const movies = require('./routes/movies');
const pathNotFound = require('./routes/not-found');

const { createUser, login } = require('./controllers/users');
const { signUp, signIn } = require('./utils/validations');
const auth = require('./middlewares/auth');

const mainErrorHandler = require('./middlewares/main-error-handler');
const { requestLogger, errorLogger } = require('./middlewares/Logger');
const cors = require('./middlewares/cors');
const {
  MONGO_DB_ADDRESS,
  PORT_NUMBER,
} = require('./utils/constants');
const rateLimiter = require('./middlewares/rateLimiter');

const { PORT = PORT_NUMBER } = process.env;
const app = express();

app.use(rateLimiter);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(helmet());
app.use(cors);
app.use(requestLogger);
app.use(express.json());

app.post('/signin', signIn, login);
app.post('/signup', signUp, createUser);
app.use(auth);

app.use(movies);
app.use(users);
app.use(pathNotFound);

app.use(errorLogger);

mongoose.connect(MONGO_DB_ADDRESS, {
  useNewUrlParser: true,
});

app.use(errors());
app.use(mainErrorHandler);

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`App listening on port ${PORT}`);
});
