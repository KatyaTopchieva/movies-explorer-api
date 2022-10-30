const PORT_NUMBER = 3000;

const BAD_REQUEST = 'Неверно переданы данные';
const INTERNAL_SERVER_ERROR = 'На сервере произошла ошибка';
const BAD_URL = 'не является URL адресом';
const NOT_FOUND_MOVIE_ERROR_MESSAGE = 'Нет фильма с таким id';
const VALIDATION_ERROR_NAME = 'ValidationError';
const ERROR_KIND_OBJECT_ID = 'ObjectId';
const FORBIDDEN_DELETE_MOVIE_MESSAGE = 'Нет доступа к удалению фильма';
const NOT_FOUND_ERROR_MESSAGE = 'Запрашиваемый ресурс не найден';
const NOT_AUTH_ERROR = 'Необходима авторизация';
const NOT_AUTH_ERROR_WRONG_EMAIL_PASSWORD = 'Неправильные почта или пароль';
const REQUEST_LOG_FILENAME = 'request.log';
const ERROR_LOG_FILENAME = 'error.log';

module.exports = {
  PORT_NUMBER,
};
