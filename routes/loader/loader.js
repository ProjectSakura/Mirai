const express = require("express");
const { LoaderController } = require("../../controllers/loader.controller");

const router = express.Router();

router.post("/", LoaderController);

module.exports = router;
