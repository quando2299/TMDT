const Contact = require('../models/contactModel');

const contactCtrl = {
  getContacts: async (req, res) => {
    try {
      const contacts = await Contact.find();
      res.json(contacts);
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  },
  createContact: async (req, res) => {
    try {
      const { first_name, last_name, phone, email, review } = req.body;

      const newContact = new Contact({
        first_name,
        last_name,
        phone,
        email,
        review,
      });

      await newContact.save();
      res.json({ message: 'Created a feedback!' });
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  },
  getContactDetail: async (req, res) => {
    try {
      return res.json(req.contact);
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  },
  contactById: async (req, res, next, id) => {
    try {
      const contact = await Contact.findById(id).exec();

      if (!contact) {
        return res.status(400).json({
          message: 'Contact not found!',
        });
      }
      req.contact = contact;
      next();
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  },
};

module.exports = contactCtrl;
