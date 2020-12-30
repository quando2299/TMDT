const Payment = require('../models/paymentModel');

const paymentCtrl = {
  createPayment: async (req, res) => {
    try {
      let paymentData = req.transactionData;
      paymentData = { ...paymentData, total: req.total };

      const payment = new Payment(paymentData);
      await payment.save();

      return res.json({ success: true, message: payment });
    } catch (error) {
      return res.status(500).json({
        message: error.message,
      });
    }
  },
};

module.exports = paymentCtrl;
