const mongoose = require('mongoose');

var userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please provide username."]
  },
  password: {
    type: String,
    required: [true, "Please provide password."]
  }
});


module.exports = mongoose.model("user", userSchema);
