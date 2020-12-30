const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema;

const orderSchema = mongoose.Schema(
  {
    user: { type: ObjectId, ref: 'User' },
    orderItems: {
      type: Array,
      default: [],
    },
    shippingAddress: {
      type: Object,
      required: true,
    },
    paymentResult: {
      type: Object,
      required: true,
    },
    totalPrice: {
      type: Number,
      required: true,
      default: 0,
    },
    status: {
      type: String,
      default: 'Not processed',
      enum: [
        'Not processed',
        'Processing',
        'Shipped',
        'Delivered',
        'Cancelled',
      ], // enum means string objects
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Order', orderSchema);
