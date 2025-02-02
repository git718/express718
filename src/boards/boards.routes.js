const express = require("express");
const router = express.Router();
const getboards = require("./controllers/getboards");

router.get("/boards", getboards.getboards);

module.exports = router;