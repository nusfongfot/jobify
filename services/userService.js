const UserModel = require("../models/User");

exports.getUserByEmail = async (email) => {
  const findUser = await UserModel.findOne({ email }, { password: 0 });
  return findUser;
};

exports.getUserById = async (userId) => {
  const user = await UserModel.findById({ _id: userId }, { password: 0 });
  return user;
};
