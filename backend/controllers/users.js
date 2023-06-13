const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const IncorrectDataError = require('../utils/errors/incorrectDataError');
const NotFoundError = require('../utils/errors/notFoundError');
const ServerError = require('../utils/errors/serverError');
const ConflictError = require('../utils/errors/conflictError');

const { NODE_ENV, JWT_SECRET } = process.env;

module.exports.getUsers = (req, res, next) => {
  User.find({})
    .then((users) => res.send(users))
    .catch(() => {
      next(new ServerError('На сервере произошла ошибка'));
    });
};

module.exports.getProfile = (req, res, next) => {
  User.findById(req.user._id)
    .orFail(() => { throw new NotFoundError('По переданному id отсутствуют данные'); })
    .then((user) => res.send({ data: user }))
    .catch(next);
};

module.exports.getUserId = (req, res) => {
  User.findById(req.params.userId)
    .orFail(() => { throw new NotFoundError('По переданному id отсутствуют данные'); })
    .then((user) => res.send({ data: user }))
    .catch((err) => {
      if (err.name === 'CastError') {
        res.status(IncorrectDataError).send({ message: 'Переданы некорректные данные' });
      } else {
        res.status(NotFoundError).send({ message: 'Пользователь по указанному _id не найден' });
      }
    });
};

module.exports.createUser = (req, res, next) => {
  const {
    name, about, avatar, email, password,
  } = req.body;
  bcrypt.hash(password, 10)
    .then((hash) => User.create({
      name, about, avatar, email, password: hash,
    }))
    .then(() => res.send({
      name, about, avatar, email,
    }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new IncorrectDataError('Переданы некорректные данные'));
      } else if (err.code === 11000) {
        next(new ConflictError('Пользователь с такими e-mail уже существует'));
      }
      next(new ServerError('На сервере произошла ошибка'));
    });
};

module.exports.updateUser = (req, res, next) => {
  const { name, about } = req.body;
  User.findByIdAndUpdate(req.user._id, { name, about }, { new: true, runValidators: true })
    .then((user) => {
      if (user) {
        res.send({ data: user });
      }
      return next(new NotFoundError('По переданному id отсутствуют данные'));
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return next(new IncorrectDataError('Переданы некорректные данные'));
      }
      return next(err);
    });
};

module.exports.updateAvatar = (req, res, next) => {
  const { avatar } = req.body;
  User.findByIdAndUpdate(req.user._id, { avatar }, { new: true, runValidators: true })
    .then((user) => {
      if (user) {
        res.send(user);
      }
      return next(new NotFoundError('По переданному id отсутствуют данные'));
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return next(new IncorrectDataError('Переданы некорректные данные'));
      }
      return next(err);
    });
};

module.exports.login = (req, res, next) => {
  const { email, password } = req.body;
  User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign(
        { _id: user._id },
        NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret',
        { expiresIn: '7d' },
      );
      res
        .cookie('jwt', token, {
          httpOnly: true,
          maxAge: 3600000 * 24 * 7,
        })
        .send({ token });
    })
    .catch((err) => {
      next(err);
    });
};
