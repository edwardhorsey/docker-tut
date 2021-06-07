const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    require: [true, 'User must have a username'],
    unqiue: true,
  },
  password: {
    type: String,
    require: [true, 'User must have a password'],
    unqiue: true,
  },
});

const User = mongoose.model('User', userSchema);

module.exports = User;
