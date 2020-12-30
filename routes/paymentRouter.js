const router = require('express').Router();
const userCtrl = require('../controllers/userCtrl');
const paymentCtrl = require('../controllers/paymentCtrl');
const auth = require('../middleware/auth');

router.post(
  '/payment/create/:userId',
  auth,
  userCtrl.successBuy,
  paymentCtrl.createPayment
);

router.post('/payment/test/:userId', auth, userCtrl.successBuy);

router.param('userId', userCtrl.userById);

module.exports = router;
