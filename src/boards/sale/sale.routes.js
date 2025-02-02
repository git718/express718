const express = require("express");
const router = express.Router();
const getsale = require("./controllers/getsale");

router.get("/sale", getsale.getsale);

module.exports = router;