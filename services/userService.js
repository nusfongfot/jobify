const UserModel = require('../models/User')

exports.getUserByEmail = async (email) => {
  const findUser = await UserModel.findOne({ email })
  return findUser
}