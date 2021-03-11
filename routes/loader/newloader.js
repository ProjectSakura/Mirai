const express = require("express");
const { RenderNewLoader } = require("../../controllers/loader.controller");

const router = express.Router();

router.post("/", RenderNewLoader)
module.exports = router;
