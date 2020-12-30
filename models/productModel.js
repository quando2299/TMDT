const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema;

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      required: true,
      maxlength: 64,
    },
    slug: {
      type: String,
      required: true,
      unique: true,
    },
    price: {
      type: Number,
      trim: true,
      required: true,
    },
    sale: {
      type: Number,
      default: 0,
    },
    discount_price: {
      type: Number,
      default: function () {
        return Math.ceil(this.price - this.price * (parseInt(this.sale) / 100));
      },
    },
    description: {
      type: String,
      required: true,
      maxlength: 2000,
    },
    images: {
      type: Array,
      required: true,
    },
    category: {
      type: ObjectId,
      ref: 'Category',
      required: true,
    },
    checked: {
      type: Boolean,
      default: false,
    },
    sold: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

productSchema.index(
  {
    name: 'text',
    description: 'text',
  },
  {
    weights: {
      name: 5,
      description: 1,
    },
  }
);

module.exports = mongoose.model('Product', productSchema);
