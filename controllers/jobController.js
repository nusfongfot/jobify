const createJob = async (req, res, next) => {
  res.json('create job')
}

const getAllJobs = async (req, res, next) => {
  res.json('getAllJobs')
}

const updateJob = async (req, res, next) => {
  res.json('updateJob')
}

const deleteJob = async (req, res, next) => {
  res.json('deleteJob')
}

const showStats = async (req, res, next) => {
  res.json('showStats')
}

module.exports = {
  createJob, getAllJobs, updateJob, deleteJob, showStats
};
