var express = require("express");
var router = express.Router();
const { SearchController, MangaSearchController } = require("../../controllers/search.controller");

router.get("/", SearchController);

router.get("/mangasearch", MangaSearchController);

module.exports = router;
