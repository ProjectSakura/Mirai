const express = require("express");
const router = express.Router();
const { RenderPlayEpisode, VideoURLController } = require("../../controllers/stream.controller");


router.get("/", RenderPlayEpisode);
router.post("/getVideoUrl", VideoURLController);

module.exports = router;
