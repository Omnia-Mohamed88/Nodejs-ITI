const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  firstName: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  dateOfBirth: {
    type: Date,
  },
});

userSchema.pre('save', async function preSave() {
  this.password = await bcrypt.hash(this.password, 10);
});

userSchema.methods.verifyPassword = async function verifyPassword(password) {
  const valid = await bcrypt.compare(password, this.password);
  return valid;
};

const User = mongoose.model('User', userSchema);
module.exports = User;
