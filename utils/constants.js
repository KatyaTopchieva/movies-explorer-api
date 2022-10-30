const PORT_NUMBER = 3000;

const BAD_REQUEST = 'Неверно переданы данные';
const INVALID_URL = 'Неправильный формат ссылки';
const INVALID_EMAIL = 'Адрес электронной почты не соответствует необходимому формату';
const CONFLICT_ERROR = 'Пользователь с такими данными уже зарегистрирован';
const FORBIDDEN_DELETE_MOVIE = 'Нет доступа к удалению фильма';
const NOT_FOUND = 'Запрашиваемый ресурс не найден';
const INTERNAL_SERVER_ERROR = 'На сервере произошла ошибка';
const VALIDATION_ERROR = 'ValidationError';
const CAST_ERROR = 'CastError';
const NOT_AUTH_ERROR = 'Необходима авторизация';
const NOT_AUTH_ERROR_WRONG_EMAIL_PASSWORD = 'Неправильные почта или пароль';

module.exports = {
  PORT_NUMBER,
  BAD_REQUEST,
  INVALID_URL,
  INVALID_EMAIL,
  CONFLICT_ERROR,
  FORBIDDEN_DELETE_MOVIE,
  NOT_FOUND,
  INTERNAL_SERVER_ERROR,
  VALIDATION_ERROR,
  CAST_ERROR,
  NOT_AUTH_ERROR,
  NOT_AUTH_ERROR_WRONG_EMAIL_PASSWORD,
};
