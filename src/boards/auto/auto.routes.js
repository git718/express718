const express = require("express");
const router = express.Router();
const getauto = require("./controllers/getauto");
const getautopost = require("./controllers/getautopost");


router.get("/auto", getauto.getauto);
router.get("/postauto", getautopost.getautopost);


module.exports = router;