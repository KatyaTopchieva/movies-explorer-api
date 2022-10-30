const Movie = require('../models/movie');
const NotFound = require('../errors/not-found');
const BadRequest = require('../errors/bad-request');
const Forbidden = require('../errors/forbidden-error');

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
      if (err.name === 'ValidationError') {
        next(new BadRequest('Неверные данные'));
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
        throw new NotFound('Такого фильма не существует');
      }
      if (req.user._id !== String(movie.owner)) {
        throw new Forbidden('Нет доступа к удалению фильма');
      }
      return Movie.findByIdAndRemove(movieId);
    })
    .then((movie) => res.send({ data: movie }))
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new BadRequest('Неверные данные'));
      } else {
        next(err);
      }
    });
};
