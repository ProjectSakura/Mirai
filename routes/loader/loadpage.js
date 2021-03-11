const express = require("express");
const { RenderLoadEpisodes } = require("../../controllers/loader.controller");

const router = express.Router();


router.get("/", RenderLoadEpisodes)
module.exports = router;
