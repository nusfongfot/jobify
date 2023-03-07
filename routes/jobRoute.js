const jobController = require("../controllers/jobController");
const authenticateUser = require("../middleware/auth");
const express = require("express");
const router = express.Router();

router
  .route("/")
  .post(jobController.createJob)
  .get(authenticateUser, jobController.getAllJobs);
router.route("/stats").get(jobController.showStats);
router
  .route("/:id")
  .delete(jobController.deleteJob)
  .patch(jobController.updateJob);

module.exports = router;
