const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  googleId: String,
  email: { type: String, unique: true },
  name: String,
  accessToken: String // Add this field to store the access token
});

module.exports = mongoose.model('User', userSchema);
