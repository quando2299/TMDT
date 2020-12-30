const mongoose = require('mongoose');
const crypto = require('crypto');

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      required: true,
      maxlength: 32,
    },
    email: {
      type: String,
      trim: true,
      required: true,
      unique: true,
    },
    hashed_password: {
      type: String,
      required: true,
    },
    salt: String,
    role: {
      type: Number,
      default: 0,
    },
    // resetPasswordLink: {
    //   type: String,
    //   default: '',
    // },
    // history: {
    //   type: Array,
    //   default: [],
    // },
  },
  { timestamps: true }
);

// Virtual field
userSchema
  .virtual('password')
  .set(function (password) {
    this._password = password;
    this.salt = this.makeSalt();
    this.hashed_password = this.encryptPassword(password);
  })
  .get(function () {
    return this._password;
  });

userSchema.methods = {
  // Generate salt
  makeSalt: function () {
    return Math.round(new Date().valueOf() * Math.random()) + '';
  },
  // Encrypt password
  encryptPassword: function (password) {
    if (!password) {
      return '';
    }
    try {
      return crypto
        .createHmac('sha1', this.salt)
        .update(password)
        .digest('hex');
    } catch (err) {
      return '';
    }
  },
  // Compare password between plain from user and hashed
  authenticate: function (plainPassword) {
    return this.encryptPassword(plainPassword) === this.hashed_password;
  },
};

module.exports = mongoose.model('User', userSchema);
