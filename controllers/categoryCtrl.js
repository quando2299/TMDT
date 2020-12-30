const Category = require('../models/categoryModel');
const Product = require('../models/productModel');

const categoryCtrl = {
  getCategories: async (req, res) => {
    try {
      const categories = await Category.find();
      res.json(categories);
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  },
  createCategory: async (req, res) => {
    try {
      // if user have role = 1 ---> admin
      // only admin can create , delete and update category
      const { name } = req.body;
      const category = await Category.findOne({ name });
      if (category)
        return res
          .status(400)
          .json({ message: 'This category already exists!' });

      const newCategory = new Category({ name });

      await newCategory.save();
      res.json(newCategory);
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  },
  deleteCategory: async (req, res) => {
    try {
      const products = await Product.findOne({ category: req.params.id });
      if (products)
        return res.status(400).json({
          message: 'Please delete all products with a relationship!',
        });

      await Category.findByIdAndDelete(req.params.id);
      res.json({ message: 'Deleted a Category!' });
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  },
  updateCategory: async (req, res) => {
    try {
      const { name } = req.body;
      const category = await Category.findOneAndUpdate(
        { _id: req.params.id },
        { name },
        { new: true }
      ).exec();

      res.json(category);
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  },
};

module.exports = categoryCtrl;
