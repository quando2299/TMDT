const mongoose = require('mongoose');

const contactSchema = new mongoose.Schema(
  {
    first_name: {
      type: String,
      trim: true,
      required: true,
      maxlength: 32,
    },
    last_name: {
      type: String,
      trim: true,
      required: true,
      maxlength: 32,
    },
    email: {
      type: String,
      trim: true,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
    review: {
      type: String,
      required: true,
      maxlength: 1000,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Contact', contactSchema);
