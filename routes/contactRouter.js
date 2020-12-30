const router = require('express').Router();
const contactCtrl = require('../controllers/contactCtrl');
const auth = require('../middleware/auth');
const authAdmin = require('../middleware/authAdmin');

router
  .route('/contacts')
  .get(auth, authAdmin, contactCtrl.getContacts)
  .post(contactCtrl.createContact);

router.get(
  '/contact/:contactId',
  auth,
  authAdmin,
  contactCtrl.getContactDetail
);

router.param('contactId', contactCtrl.contactById);

module.exports = router;
