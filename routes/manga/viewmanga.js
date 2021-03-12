const express = require("express");
const router = express.Router();
const { RenderViewManga } = require("../../controllers/manga.controller");

router.get("/", RenderViewManga);

module.exports = router;
