const { check } = require('express-validator');

exports.validEmail = [
  check('email').isEmail().withMessage('Must be a valid email address!'),
];

exports.validRegister = [
  check('name', 'Name is required!')
    .not()
    .isEmpty()
    .isLength({
      min: 4,
      max: 32,
    })
    .withMessage('name must be between 3 to 32 characters!'),
  check('email').isEmail().withMessage('Must be a valid email address!'),
  check('password', 'Password is required').not().isEmpty(),
  check('password')
    .isLength({
      min: 6,
    })
    .withMessage('Password must contain at least 6 characters!')
    .matches(/\d/)
    .withMessage('Password must contain a number!'),
];

exports.validLogin = [
  check('email').isEmail().withMessage('Must be a valid email address!'),
  check('password', 'Password is required').not().isEmpty(),
  check('password')
    .isLength({
      min: 6,
    })
    .withMessage('Password must contain at least 6 characters!')
    .matches(/\d/)
    .withMessage('Password must contain a number!'),
];

exports.validEdit = [
  check('name', 'Name is required!')
    .not()
    .isEmpty()
    .isLength({
      min: 4,
      max: 32,
    })
    .withMessage('Name must be between 3 to 32 characters!'),
  // check('email').isEmail().withMessage('Must be a valid email address!'),
];

exports.validChangePassword = [
  check('password', 'password is required').not().isEmpty(),
  check('password')
    .isLength({
      min: 6,
    })
    .withMessage('Password must contain at least 6 characters!')
    .matches(/\d/)
    .withMessage('Password must contain a number!'),
  check('new_password', 'New password is required').not().isEmpty(),
  check('password')
    .isLength({
      min: 6,
    })
    .withMessage('New password must contain at least 6 characters!')
    .matches(/\d/)
    .withMessage('New password must contain a number!'),
];
