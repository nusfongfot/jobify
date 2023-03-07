const JobModel = require("../models/Job.js");
const { StatusCodes } = require("http-status-codes");
const { BadRequestError, UnAuthenticatedError } = require("../errors/index.js");

const createJob = async (req, res, next) => {
  const { position, company } = req.body;
  if (!position || !company) {
    throw new BadRequestError("please provide all values");
  }
  req.body.createdBy = req.user.userId;
  const job = await JobModel.create(req.body);
  res.status(StatusCodes.CREATED).json({ job });
};

const getAllJobs = async (req, res, next) => {
  try {
    const jobs = await JobModel.find({ createdBy: req.user.userId });
    res
      .status(StatusCodes.OK)
      .json({ jobs, totalJobs: jobs.length, numOfPages: 1 });
  } catch (error) {
    next();
  }
};

const updateJob = async (req, res, next) => {
  res.json("updateJob");
};

const deleteJob = async (req, res, next) => {
  res.json("deleteJob");
};

const showStats = async (req, res, next) => {
  res.json("showStats");
};

module.exports = {
  createJob,
  getAllJobs,
  updateJob,
  deleteJob,
  showStats,
};
