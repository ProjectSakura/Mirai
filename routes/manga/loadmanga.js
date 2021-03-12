var express = require("express");
var router = express.Router();
const { RenderLoadManga } = require("../../controllers/manga.controller");

router.get("/", RenderLoadManga);

module.exports = router;
