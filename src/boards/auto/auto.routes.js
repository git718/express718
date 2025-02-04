const express = require("express");
const router = express.Router();
const getauto = require("./controllers/getauto");
const getautopost = require("./controllers/getautopost");
const postauto = require("./controllers/postauto")

router.get("/auto", getauto.getauto)
router.get("/postauto", getautopost.getautopost)
router.post("/postauto", postauto.postauto)

module.exports = router;