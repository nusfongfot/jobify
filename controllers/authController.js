const UserModel = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { StatusCodes } = require("http-status-codes");
const { BadRequestError } = require("../errors/index");
const UserService = require("../services/userService");

const genToken = (payload) => {
  const privateKey = process.env.JWT_SECRET;
  const options = { expiresIn: process.env.LIFE_TIME };
  const token = jwt.sign(payload, privateKey, options);
  return token;
};

const register = async (req, res, next) => {
  try {
    const { firstname, lastname, email, password } = req.body;
    if (!firstname || !lastname || !email || !password) {
      throw new BadRequestError("please provide all values");
    }
    const userAlreadyExists = await UserService.getUserByEmail(email);
    if (userAlreadyExists) {
      throw new BadRequestError("Email is already exists");
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPass = await bcrypt.hash(password, salt);

    const newUser = new UserModel({
      firstname,
      lastname,
      email,
      password: hashedPass,
    });
    await newUser.save();
    //generate token
    const payload = { userId: newUser._id, firstname, lastname };
    const token = genToken(payload);
    res.status(StatusCodes.OK).json({
      token,
      newUser: { firstname, lastname, email },
      message: "register successfully",
      location: newUser.location,
    });
  } catch (error) {
    next({ message: "register failed" });
  }
};

const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const findUser = await UserService.getUserByEmail(email);
    if (!findUser) {
      res
        .status(StatusCodes.FORBIDDEN)
        .json("email or password is not correct");
    }
    // const hashedPassword = findUser.password;
    // const isCorrect = await bcrypt.compare(password, hashedPassword);
    // if (!isCorrect) {
    //   res
    //     .status(StatusCodes.FORBIDDEN)
    //     .json("email or password is not correct");
    // }
    const { _id: id, firstname, lastname } = findUser;
    const payload = { userId: id, firstname, lastname };
    const token = genToken(payload);
    res.status(StatusCodes.OK).json({
      token,
      findUser: { firstname, lastname, email },
      message: "login successfully",
      location: findUser.location,
    });
  } catch (error) {
    next(error);
  }
};

const updateUser = async (req, res, next) => {
  try {
    const { firstname, lastname, email, location } = req.body;
    const user = await UserService.getUserByEmail(email);
    if (!firstname || !lastname || !email || !location) {
      throw new BadRequestError("please provide all values");
    }
    user.firstname = firstname;
    user.lastname = lastname;
    user.email = email;
    user.location = location;
    await user.save();
    const payload = {
      _id: req.user.userId,
      firstname,
      lastname,
      email,
      location,
    };
    const token = genToken(payload);
    res.status(StatusCodes.OK).json({ user, token, location: user.location });
  } catch (error) {    
    next();
  }
};

const getMe = async (req, res, next) => {
  try {
    const user = await UserModel.findOne({ user: req.user }, { password: 0 });
    res.status(StatusCodes.OK).json({ user });
  } catch (error) {
    next();
  }
};

module.exports = {
  register,
  login,
  updateUser,
  getMe,
};
