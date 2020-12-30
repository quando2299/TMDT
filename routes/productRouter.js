const router = require('express').Router();
const productCtrl = require('../controllers/productCtrl');
const auth = require('../middleware/auth');
const authAdmin = require('../middleware/authAdmin');

router.get('/products', productCtrl.getProducts);
router.get('/products/all', productCtrl.getAllProducts);
router.get('/product/:slug', productCtrl.getProductDetail);
router.get('/products/related/:productId', productCtrl.getRelatedProduct);
router.post('/products/filter', productCtrl.getByFilter);
router.post('/product/create', auth, authAdmin, productCtrl.createProduct);
router
  .route('/product/:id')
  .delete(auth, authAdmin, productCtrl.deleteProduct)
  .put(auth, authAdmin, productCtrl.updateProduct);

router.param('productId', productCtrl.productById);

module.exports = router;
