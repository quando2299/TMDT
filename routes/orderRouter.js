const router = require('express').Router();
const orderCtrl = require('../controllers/orderCtrl');
const productCtrl = require('../controllers/productCtrl');
const userCtrl = require('../controllers/userCtrl');
const auth = require('../middleware/auth');
const authAdmin = require('../middleware/authAdmin');

router.get('/orders', auth, authAdmin, orderCtrl.getAllOrders);
router.get('/order/status', auth, authAdmin, orderCtrl.getStatusValues);
router.get('/orders/:userId', auth, orderCtrl.getOrders);
router.get('/order/:orderId', orderCtrl.getOrderDetail);
router.post(
  '/order/create',
  auth,
  productCtrl.increaseSold,
  orderCtrl.createOrder
);
router.put(
  '/order/status/:orderId',
  auth,
  authAdmin,
  orderCtrl.updateOrderStatus
);

router.param('orderId', orderCtrl.orderById);
router.param('userId', userCtrl.userById);

module.exports = router;
