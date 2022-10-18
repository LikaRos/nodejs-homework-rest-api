const bcrypt = require("bcryptjs");
require("dotenv").config();
const gravatar = require("gravatar");

const { User } = require("../../models/user");

const { RequestError } = require("../../helpers");

const register = async (req, res) => {
  const { name, email, password } = req.body;

  const user = await User.findOne({ email });

  if (user) {
    throw RequestError(409, "Email in use");
  }
  const hashPassword = await bcrypt.hash(password, 10);

  const result = await User.create({
    name,
    email,
    password: hashPassword,
    avatarURL: gravatar.url(email),
  });

  res.status(201).json({
    email: result.email,
    subscription: result.subscription.enum,
  });
};

module.exports = register;
