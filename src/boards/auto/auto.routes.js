const express = require("express");
const router = express.Router();
const getauto = require("./controllers/getauto");
const getautopost = require("./controllers/getautopost");
const postauto = require("./controllers/postauto")
const getautophotos = require("./controllers/get_auto_photos")
const getprofile = require("./controllers/view_profile")
const formidableMiddleware = require('express-formidable');

router.get("/auto", getauto.getauto)
router.get("/postauto", getautopost.getautopost)
router.get("/auto_photos/:post_id", getautophotos.getautophotos)
router.get("/view_auto_seller_profile/:user_id", getprofile.view_profile)
router.post("/postauto",formidableMiddleware(), postauto.postauto)


module.exports = router;