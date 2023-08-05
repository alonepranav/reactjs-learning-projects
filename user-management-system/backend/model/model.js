const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  email: String,
  phone: String,
});

const User = new mongoose.model("User", userSchema);

module.exports = mongoose.model.user || User;
