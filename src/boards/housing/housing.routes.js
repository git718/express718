const express = require("express");
const router = express.Router();
const gethousing = require("./controllers/gethousing");

router.get("/housing", gethousing.gethousing);

module.exports = router;