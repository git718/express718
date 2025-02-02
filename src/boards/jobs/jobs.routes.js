const express = require("express");
const router = express.Router();
const getjobs = require("./controllers/getjobs");

router.get("/jobs", getjobs.getjobs);

module.exports = router;