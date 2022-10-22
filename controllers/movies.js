const Movie = require('../models/movie');
const { isCastError, isValidationError } = require('../utils/error-handler');
const NotFound = require('../errors/not-found');
const Forbidden = require('../errors/forbidden-error');
const BadRequest = require('../errors/bad-request');

module.exports.getMovies = (req, res, next) => {
  Movie.find({})
    .then((movies) => res.send({ data: movies }))
    .catch((err) => next(err));
};

module.exports.createMovie = (req, res, next) => {
  const owner = req.user._id;
  const {
    country,
    director,
    duration,
    year,
    description,
    image,
    trailerLink,
    thumbnail,
    movieId,
    nameRU,
    nameEN,
  } = req.body;
  Movie.create({
    country,
    director,
    duration,
    year,
    description,
    image,
    trailerLink,
    thumbnail,
    movieId,
    nameRU,
    nameEN,
    owner,
  })
    .then((movie) => res.send({ data: movie }))
    .catch((err) => {
      if (isValidationError(res, err)) {
        next(new BadRequest(err.message));
      } else {
        next(err);
      }
    });
};


