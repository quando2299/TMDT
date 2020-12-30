const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema;

const paymentSchema = mongoose.Schema(
  {
    user: { type: ObjectId, ref: 'User' },
    total: { type: Number, required: true },
    data: {
      type: Object,
      required: true,
    },
    product: {
      type: Array,
      default: [],
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
  { timestamps: true }
);

module.exports = mongoose.model('Payment', paymentSchema);
