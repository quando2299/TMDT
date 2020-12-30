const User = require('../models/userModel');
const jwt = require('jsonwebtoken');
const { validationResult } = require('express-validator');

const authCtrl = {
  signup: async (req, res) => {
    try {
      const { name, email, password } = req.body;
      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        const firstError = errors.array().map((error) => error.msg)[0];
        return res.status(422).json({
          message: firstError,
        });
      } else {
        const user = await User.findOne({ email });

        if (user) {
          return res
            .status(400)
            .json({ message: 'The email is already exists!' });
        }

        const newUser = new User({
          name,
          email,
          password,
        });

        await newUser.save();

        res.json({
          success: true,
          message: 'Signup success!',
          user: newUser,
        });
      }
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  },
  signin: async (req, res) => {
    try {
      const { password } = req.body;
      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        const firstError = errors.array().map((error) => error.msg)[0];
        return res.status(422).json({
          message: firstError,
        });
      } else {
        // check if user exist
        const user = await User.findOne({ email: req.body.email });

        if (!user) {
          return res.status(400).json({
            message: 'User with that email does not exist. Please signup!',
          });
        }
        // authenticate
        if (!user.authenticate(password)) {
          return res.status(400).json({
            message: 'Email and password do not match!',
          });
        }
        // generate a token and send to client
        const token = jwt.sign(
          {
            _id: user._id,
            role: user.role,
          },
          process.env.ACCESS_TOKEN_SECRET,
          {
            expiresIn: '30d',
          }
        );

        res.cookie('token', token, {
          expiresIn: '30d',
        });

        const { _id, name, email, role } = user;

        return res.json({
          token,
          user: {
            _id,
            name,
            email,
            role,
          },
        });
      }
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  },
  signinAdmin: async (req, res) => {
    try {
      const { password } = req.body;
      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        const firstError = errors.array().map((error) => error.msg)[0];
        return res.status(422).json({
          message: firstError,
        });
      } else {
        // check if user exist
        const user = await User.findOne({ email: req.body.email });

        if (!user) {
          return res.status(400).json({
            message: 'User with that email does not exist. Please signup!',
          });
        }
        // authenticate
        if (!user.authenticate(password)) {
          return res.status(400).json({
            message: 'Email and password do not match!',
          });
        }
        // check role
        if (user.role !== 1) {
          return res.status(400).json({
            message: 'This is not admin account!',
          });
        }
        // generate a token and send to client
        const token = jwt.sign(
          {
            _id: user._id,
            role: user.role,
          },
          process.env.ACCESS_TOKEN_SECRET,
          {
            expiresIn: '30d',
          }
        );

        res.cookie('token', token, {
          expiresIn: '30d',
        });

        const { _id, name, email, role } = user;

        return res.json({
          token,
          user: {
            _id,
            name,
            email,
            role,
          },
        });
      }
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  },
  signout: (req, res) => {
    res.clearCookie('token');
    res.json({ message: 'Signout successfully!' });
  },
  // authenticateJWT: (req, res, next) => {
  //   try {
  //     const authHeader = req.headers.authorization;

  //     if (authHeader) {
  //       const token = authHeader.split(' ')[1];

  //       jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
  //         if (err) {
  //           return res.status(401).json({
  //             message:
  //               'Please make sure your request has an Authorization header!',
  //           });
  //         }
  //         req.auth = user;
  //         next();
  //       });
  //     } else {
  //       return res.status(401).json({
  //         message: 'Please make sure your request has an Authorization header!',
  //       });
  //     }
  //   } catch (error) {
  //     return res.status(500).json({ message: error.message });
  //   }
  // },
  // isAuth: (req, res, next) => {
  //   const user = req.profile && req.auth && req.profile._id == req.auth._id;

  //   if (!user) {
  //     return res.status(403).json({
  //       message: 'Access denied!',
  //     });
  //   }
  //   next();
  // },
  // isAdmin: (req, res, next) => {s
  //   if (req.profile.role === 0) {
  //     return res.status(403).json({
  //       message: 'Admin resource. Access denied!',
  //     });
  //   }
  //   next();
  // },
};

module.exports = authCtrl;
