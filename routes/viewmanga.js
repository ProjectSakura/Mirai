var express = require("express");
const mangaPark = require("./mangaPark");
const mangaParkObj = new mangaPark();
var router = express.Router();

router.get("/", async function (req, res, next) {
  var url = req.query.url;
  // http://localhost:3000/viewmanga?url=https://mangakakalot.com/chapter/sd925573/chapter_1
  // https://mangapark.net/manga/solo-leveling/i2628794/c133
  const image = await mangaParkObj.getImageList(url);
  const information = await mangaParkObj.getChapterInfo(url);
  res.render("viewmanga", {
    title: "Anime Master",
    images: image.images,
    details: information,
  });
});
module.exports = router;
