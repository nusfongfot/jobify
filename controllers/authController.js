const UserModel = require('../models/User')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const { StatusCodes } = require('http-status-codes')
const { BadRequestError } = require('../errors/index')
const UserService = require('../services/userService')

const genToken = (payload) => {
  const privateKey = process.env.JWT_SECRET
  const options = { expiresIn: process.env.LIFE_TIME }
  const token = jwt.sign(payload, privateKey, options)
  return token
}

const register = async (req, res, next) => {
  try {
    const { firstname, lastname, email, password } = req.body
    if (!firstname || !lastname || !email || !password) {
      throw new BadRequestError('please provide all values')
    }
    const userAlreadyExists = await UserService.getUserByEmail(email)
    if (userAlreadyExists) {
      throw new BadRequestError('Email is already exists')
    }
    const salt = await bcrypt.genSalt(10)
    const hashedPass = await bcrypt.hash(password, salt)

    const newUser = new UserModel({
      firstname,
      lastname,
      email,
      password: hashedPass
    })
    await newUser.save()
    //generate token
    const payload = { userId: newUser._id, firstname, lastname }
    const token = genToken(payload)
    res.status(StatusCodes.OK).json({ 
      token, 
      newUser: { firstname, lastname, email }, 
      message: 'register successfully', 
      location: newUser.location 
    })
  } catch (error) {
    next({ message: 'register failed' })
  }
}

const login = async (req, res, next) => {
  try {
    const { email, password } = req.body
    const findUser = await UserService.getUserByEmail(email)
    if (!findUser) {
      res.status(StatusCodes.FORBIDDEN).json('email or password is not correct')
    }
    const isCorrect = await bcrypt.compare(password, findUser.password)
    if (!isCorrect) {
      res.status(StatusCodes.FORBIDDEN).json('email or password is not correct')
    }
    const { _id: id, firstname, lastname } = findUser
    const payload = { userId: id, firstname, lastname }
    const token = genToken(payload)
    res.status(StatusCodes.OK).json({ 
      token, 
      findUser: { firstname, lastname, email }, 
      message: 'login successfully', 
      location: findUser.location 
    })
  } catch (error) {
    next(error)
  }
}

const updateUser = async (req, res, next) => {
  res.json('updateUser User')
}

module.exports = {
  register, login, updateUser
};
