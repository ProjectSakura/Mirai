const express = require("express");
const { RenderAnimeList } = require("../../controllers/loader.controller");

const router = express.Router();

router.get("/", RenderAnimeList);

module.exports = router;
