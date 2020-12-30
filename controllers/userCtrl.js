const User = require('../models/userModel');
const Order = require('../models/orderModel');
const { validationResult } = require('express-validator');
const _ = require('lodash');

const userCtrl = {
  successBuy: (req, res, next) => {
    try {
      let history = [];
      let transactionData = {};

      req.body.cartItems.forEach((item) =>
        history.push({
          _id: item._id,
          name: item.name,
          description: item.description,
          category: item.category,
          quantity: item.quantity,
          images: item.images,
          price: item.discount_price,
          total: item.discount_price * item.quantity,
          paymentId: req.body.data.paymentID,
        })
      );

      transactionData.user = req.profile._id;
      transactionData.data = req.body.data;
      transactionData.product = history;
      req.transactionData = transactionData;
      req.total = req.body.total;

      User.findOneAndUpdate(
        { _id: req.profile._id },
        { $push: { history: history } },
        { new: true },
        (err, user) => {
          if (err) {
            return res.status(400).json({ success: false, error: err });
          }
        }
      );

      next();
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  },
  userById: async (req, res, next, id) => {
    try {
      const user = await User.findById(id).exec();

      if (!user) {
        return res.status(400).json({
          message: 'User not found!',
        });
      }
      req.profile = user;
      next();
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  },
  update: async (req, res) => {
    try {
      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        const firstError = errors.array().map((error) => error.msg)[0];
        return res.status(422).json({
          message: firstError,
        });
      } else {
        const user = await User.findOneAndUpdate(
          { _id: req.profile._id },
          { $set: req.body },
          { new: true }
        );

        user.hashed_password = undefined;
        user.salt = undefined;

        const { _id, name, email, role } = user;

        return res.json({ _id, name, email, role });
      }
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  },
  changePassword: async (req, res) => {
    try {
      const { password, new_password } = req.body;
      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        const firstError = errors.array().map((error) => error.msg)[0];
        return res.status(422).json({
          message: firstError,
        });
      } else {
        let user = await User.findOne({ email: req.body.email });

        // authenticate
        if (!user.authenticate(password)) {
          return res.status(400).json({
            message: 'Current password is not correctly!',
          });
        } else {
          user.hashed_password = undefined;
          user.salt = undefined;

          const updatedFields = {
            password: new_password,
            resetPasswordLink: '',
          };

          user = _.extend(user, updatedFields);

          await user.save();

          return res.json({ message: 'Change password successfully!' });
        }
      }
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  },
  updateUserRole: async (req, res) => {
    try {
      const user = await User.findOneAndUpdate(
        { _id: req.params.id },
        { $set: { role: req.body.role } },
        { new: true }
      );
      return res.json(user);
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  },
  deleteUserRole: async (req, res) => {
    try {
      const orders = await Order.findOne({ user: req.params.id });
      if (orders)
        return res.status(400).json({
          message: 'Please delete all orders with a relationship!',
        });

      await User.findByIdAndDelete(req.params.id);
      res.json({ message: 'Deleted a User!' });
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  },
  getAllUsers: async (req, res) => {
    try {
      const users = await User.find();
      res.json(users);
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  },
};

module.exports = userCtrl;
