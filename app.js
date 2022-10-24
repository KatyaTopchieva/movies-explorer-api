require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const { errors } = require('celebrate');

const users = require('./routes/users');
const movies = require('./routes/movies');
const pathNotFound = require('./routes/not-found');

const { createUser, login } = require('./controllers/users');
const { signUp, signIn } = require('./utils/validations');
const auth = require('./middlewares/auth');

const { PORT = 3000 } = process.env;
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.json());

app.post('/signin', signIn, login);
app.post('/signup', signUp, createUser);
app.use(auth);

app.use(movies);
app.use(users);
app.use(pathNotFound);

mongoose.connect('mongodb://localhost:27017/moviesdb', {
  useNewUrlParser: true,
});

app.use(errors());

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`App listening on port ${PORT}`);
});
