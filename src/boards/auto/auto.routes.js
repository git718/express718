const express = require("express");
const router = express.Router();
const getauto = require("./controllers/getauto");
const getautopost = require("./controllers/getautopost");
const postauto = require("./controllers/postauto")
const formidableMiddleware = require('express-formidable');

router.get("/auto", getauto.getauto)
router.get("/postauto", getautopost.getautopost)
router.post("/postauto",formidableMiddleware(), postauto.postauto)

module.exports = router;