const router = require('express').Router();
const mailCtrl = require('../controllers/mailCtrl');
const { validEmail } = require('../validator/userValidator');

router.post('/email', validEmail, mailCtrl.send);

module.exports = router;
