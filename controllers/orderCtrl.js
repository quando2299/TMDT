const Order = require('../models/orderModel');

const orderCtrl = {
  createOrder: async (req, res) => {
    try {
      const {
        orderItems,
        shippingAddress,
        paymentResult,
        totalPrice,
      } = req.body;

      if (orderItems && orderItems.length === 0) {
        return res.status(400).json({ message: 'No order items!' });
      } else {
        const order = new Order({
          user: req.auth._id,
          orderItems,
          shippingAddress,
          paymentResult,
          totalPrice,
        });

        const createdOrder = await order.save();
        res.status(200).json({ order: createdOrder });
      }
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  },
  getOrders: async (req, res) => {
    try {
      const orders = await Order.find({ user: req.profile._id });

      res.status(200).json(orders);
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  },
  getAllOrders: async (req, res) => {
    try {
      const orders = await Order.find();

      res.status(200).json(orders);
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  },
  getOrderDetail: async (req, res) => {
    try {
      const { id } = req.params;

      const order = await Order.findOne({ id });

      if (!order)
        return res.status(400).json({ message: 'This order is not exists!' });
      else {
        res.status(200).json({ status: 'success', order });
      }
    } catch (error) {
      return res.status(500).json({
        message: error.message,
      });
    }
  },
  orderById: async (req, res, next, id) => {
    try {
      const order = await Order.findById(id).exec();

      if (!order) {
        return res.status(400).json({
          message: 'Order not found!',
        });
      }
      req.order = order;
      next();
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  },
  getOrderDetail: (req, res) => {
    try {
      return res.json(req.order);
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  },
  getStatusValues: (req, res) => {
    try {
      return res.json(Order.schema.path('status').enumValues);
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  },
  updateOrderStatus: async (req, res) => {
    try {
      const order = await Order.findOneAndUpdate(
        { _id: req.order._id },
        { $set: { status: req.body.status } },
        { new: true }
      );
      return res.json(order);
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  },
};

module.exports = orderCtrl;
