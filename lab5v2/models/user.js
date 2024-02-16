const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    minlength: 8,
  },
  firstName: {
    type: String,
    required: true,
    maxlength: 15,

  },
  password: {
    type: String,
    required: true,
  },
  dateOfBirth: {
    type: Date,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});
// middleware before saving
userSchema.pre('save', async function preSave() {
  this.password = await bcrypt.hash(this.password, 10);// cost facttor is 10
});

userSchema.methods.verifyPassword = async function verifyPassword(password) {
  const valid = await bcrypt.compare(password, this.password);
  return valid;
};

const User = mongoose.model('User', userSchema);
module.exports = User;
