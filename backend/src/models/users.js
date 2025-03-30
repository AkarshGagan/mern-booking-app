const { default: mongoose } = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, reuqired: true },
  firstName: { type: String, reuqired: true },
  lastName: { type: String, reuqired: true },
});

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }
  this.password = await bcrypt.hash(this.password, 8);
});

userSchema.methods.correctPassword = async function (reqPassword, Dbpassword) {
  return await bcrypt.compare(reqPassword, Dbpassword);
};
const User = mongoose.model("User", userSchema);

module.exports = User;
