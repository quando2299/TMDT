const router = require('express').Router();
const authCtrl = require('../controllers/authCtrl');
const { validRegister, validLogin } = require('../validator/userValidator');

router.post('/signup', validRegister, authCtrl.signup);
router.post('/signin', validLogin, authCtrl.signin);
router.post('/admin/signin', validLogin, authCtrl.signinAdmin);
router.post('/signout', authCtrl.signout);

module.exports = router;
