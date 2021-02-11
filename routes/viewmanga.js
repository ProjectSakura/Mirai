const express = require("express");
const mangaPark = require("./mangapark");
const mangaParkObj = new mangaPark();
const router = express.Router();

router.get("/", async function (req, res, next) {
  const url = req.query.url;
  const image = await mangaParkObj.getImageList(url);
  const information = await mangaParkObj.getChapterInfo(url);
  res.render("viewmanga", {
    title: "Anime Master",
    images: image.images,
    details: information,
  });
});
module.exports = router;
