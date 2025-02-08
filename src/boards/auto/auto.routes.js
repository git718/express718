const express = require("express");
const router = express.Router();
const getauto = require("./controllers/getauto");
const getautopost = require("./controllers/getautopost");
const postauto = require("./controllers/postauto")
const getautophotos = require("./controllers/get_auto_photos")
const formidableMiddleware = require('express-formidable');

router.get("/auto", getauto.getauto)
router.get("/postauto", getautopost.getautopost)
router.get("/get_auto_photos/:post_id", getautophotos.getautophotos)
router.post("/postauto",formidableMiddleware(), postauto.postauto)


module.exports = router;