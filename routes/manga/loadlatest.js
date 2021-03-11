const express = require("express");
const { RenderLatestManga } = require("../../controllers/manga.controller");
const router = express.Router();

router.get("/", RenderLatestManga);

module.exports = router;
