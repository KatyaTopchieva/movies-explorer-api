const router = require('express').Router();

const {
  getMovies,
  createMovie,
  deleteMovie,
} = require('../controllers/movies');

const {
  createMovieValidation,
  movieIdValidation,
} = require('../utils/validations');

router.get('/movies', getMovies);
router.post('/movies', createMovieValidation, createMovie);
router.deleteMovie('/movies/:moviesId', movieIdValidation, deleteMovie);

module.exports = router;
