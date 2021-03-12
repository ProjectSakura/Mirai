var express = require("express");
const RenderHomePage = require("../controllers/index.controller");
var router = express.Router();

/* GET home page. */
router.get("/", RenderHomePage);

module.exports = router;
