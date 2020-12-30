const Product = require('../models/productModel');
const slugify = require('slugify');

const productCtrl = {
  getProducts: async (req, res) => {
    try {
      let order = req.query.order ? req.query.order : 'asc';
      let sortBy = req.query.sortBy ? req.query.sortBy : '_id';
      let limit = req.query.limit ? parseInt(req.query.limit) : 6;

      const products = await Product.find()
        .populate('category')
        .sort([[sortBy, order]])
        .limit(limit)
        .exec();

      res.status(200).json({
        status: 'success',
        result: products.length,
        products,
      });
    } catch (error) {
      return res.status(500).json({
        message: error.message,
      });
    }
  },
  getAllProducts: async (req, res) => {
    try {
      const keyword = req.query.keyword
        ? {
            name: {
              $regex: req.query.keyword,
              $options: 'i',
            },
          }
        : {};

      const products = await Product.find({ ...keyword })
        .populate('category', 'name')
        .exec();
      res.json({
        status: 'success',
        result: products.length,
        products,
      });
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  },
  getByFilter: async (req, res) => {
    try {
      let order = req.body.order ? req.body.order : 'asc';
      let sortBy = req.body.sortBy ? req.body.sortBy : '_id';
      let limit = req.body.limit ? parseInt(req.body.limit) : 8;
      let skip = parseInt(req.body.skip);

      let findArgs = {};

      for (let key in req.body.filters) {
        if (req.body.filters[key].length > 0) {
          if (key === 'discount_price') {
            // gte -  greater than price [0-10]
            // lte - less than
            findArgs[key] = {
              $gte: req.body.filters[key][0],
              $lte: req.body.filters[key][1],
            };
          } else {
            findArgs[key] = req.body.filters[key];
          }
        }
      }

      const products = await Product.find(findArgs)
        .populate('category')
        .sort([[sortBy, order]])
        .skip(skip)
        .limit(limit)
        .exec();

      res.status(200).json({ size: products.length, products });
    } catch (error) {
      return res.status(500).json({
        message: error.message,
      });
    }
  },
  getRelatedProduct: async (req, res) => {
    try {
      let limit = req.query.limit ? parseInt(req.query.limit) : 4;

      const products = await Product.find({
        _id: { $ne: req.product },
        category: req.product.category,
      })
        .limit(limit)
        .populate('category')
        .exec();

      return res.status(200).json({
        status: 'success',
        products,
      });
    } catch (error) {
      return res.status(500).json({
        message: error.message,
      });
    }
  },
  getProductDetail: async (req, res) => {
    try {
      const { slug } = req.params;

      const product = await Product.findOne({ slug })
        .populate('category', 'name')
        .exec();

      if (!product)
        return res.status(400).json({ message: 'This product is not exists!' });
      else {
        res.status(200).json({ status: 'success', product });
      }
    } catch (error) {
      return res.status(500).json({
        message: error.message,
      });
    }
  },
  createProduct: async (req, res) => {
    try {
      const { name, price, description, images, category, sale } = req.body;
      if (!images) return res.status(400).json({ message: 'No image upload!' });

      const product = await Product.findOne({ name });
      if (product) {
        return res
          .status(400)
          .json({ message: 'This product is already exists!' });
      }

      const newProduct = new Product({
        name,
        slug: slugify(name).toLowerCase(),
        price,
        description,
        images,
        category,
        sale,
      });

      await newProduct.save();
      res.json({
        success: true,
        message: 'Created a product!',
        product: newProduct,
      });
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  },
  deleteProduct: async (req, res) => {
    try {
      await Product.findByIdAndDelete(req.params.id);
      res.json({ message: 'Deleted a Product!' });
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  },
  updateProduct: async (req, res) => {
    try {
      const { name, price, description, images, category, sale } = req.body;

      let obj = {
        name,
        slug: slugify(name).toLowerCase(),
        price,
        discount_price: Math.ceil(price - price * (parseInt(sale) / 100)),
        description,
        category,
        sale,
      };

      if (images) {
        obj.images = images;
      }

      await Product.findOneAndUpdate({ _id: req.params.id }, obj, {
        new: true,
      });

      res.json({
        success: true,
        message: 'Updated a Product!',
      });
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  },
  increaseSold: async (req, res, next) => {
    let bulkOps = req.body.orderItems.map((item) => {
      return {
        updateOne: {
          filter: { _id: item._id },
          update: { $inc: { sold: +item.quantity } },
        },
      };
    });

    try {
      await Product.bulkWrite(bulkOps, {});
    } catch (error) {
      return res
        .status(400)
        .json({ success: false, message: 'Could not update product!' });
    }

    next();
  },
  productById: async (req, res, next, id) => {
    try {
      const product = await Product.findById(id).populate('category').exec();

      if (!product) {
        return res.status(400).json({
          message: 'Product not found!',
        });
      }

      req.product = product;
      next();
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  },
};

module.exports = productCtrl;
