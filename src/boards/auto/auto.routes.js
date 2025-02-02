const express = require("express");
const router = express.Router();
const getauto = require("./controllers/getauto");

router.get("/auto", getauto.getauto);

module.exports = router;