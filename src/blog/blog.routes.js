const express = require("express");
const router = express.Router();
const getposts = require("./controllers/getposts");
const deleteposts = require("./controllers/deletepost");
const insertposts = require("./controllers/insertpost");
const fileUpload = require("express-fileupload");

router.get("/blog", urlencodedParser, getposts.getposts);

router.get("/blog/:id", deleteposts.deleteposts);

router.post("/post", insertposts.insertposts, (err) => {if (err) {console.log(err);
} else {console.log('success');
};
});


module.exports = router;
