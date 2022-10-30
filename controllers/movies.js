const Movie = require('../models/movie');
const NotFound = require('../errors/not-found');
const BadRequest = require('../errors/bad-request');
const Forbidden = require('../errors/forbidden-error');

const {
  BAD_REQUEST,
  FORBIDDEN_DELETE_MOVIE,
  NOT_FOUND,
  VALIDATION_ERROR,
  CAST_ERROR,
} = require('../utils/constants');

module.exports.getMovies = (req, res, next) => {
  Movie.find({})
    .then((movies) => res.send({ data: movies }))
    .catch((err) => next(err));
};

module.exports.createMovie = (req, res, next) => {
  const owner = req.user._id;

  Movie.create({ owner, ...req.body })
    .then((movie) => res.send({ data: movie }))
    .catch((err) => {
      if (err.name === VALIDATION_ERROR) {
        next(new BadRequest(BAD_REQUEST));
      } else {
        next(err);
      }
    });
};

module.exports.deleteMovie = (req, res, next) => {
  const { movieId } = req.params;
  Movie.findById(movieId)
    .then((movie) => {
      if (!movie) {
        throw new NotFound(NOT_FOUND);
      }
      if (req.user._id !== String(movie.owner)) {
        throw new Forbidden(FORBIDDEN_DELETE_MOVIE);
      }
      return Movie.findByIdAndRemove(movieId);
    })
    .then((movie) => res.send({ data: movie }))
    .catch((err) => {
      if (err.name === CAST_ERROR) {
        next(new BadRequest(BAD_REQUEST));
      } else {
        next(err);
      }
    });
};
