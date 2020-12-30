const router = require('express').Router();
const authCtrl = require('../controllers/authCtrl');
const userCtrl = require('../controllers/userCtrl');
const auth = require('../middleware/auth');
const authAdmin = require('../middleware/authAdmin');
const {
  validEdit,
  validChangePassword,
} = require('../validator/userValidator');

router.get('/users', auth, authAdmin, userCtrl.getAllUsers);
router.put('/user/:userId', auth, validEdit, userCtrl.update);
router.put(
  '/user/password/:userId',
  auth,
  validChangePassword,
  userCtrl.changePassword
);
router.delete('/user/:id', auth, authAdmin, userCtrl.deleteUserRole);
router.put('/user/update/:id', auth, authAdmin, userCtrl.updateUserRole);

router.param('userId', userCtrl.userById);

module.exports = router;
