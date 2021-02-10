var express = require("express");
const mangaPark = require("./mangapark");
const mangaParkObj = new mangaPark();
var router = express.Router();

router.get("/", async function (req, res, next) {
  var url = req.query.url;
  const manga = await mangaParkObj.getMangaInfo(url);
  res.render("loadmanga", {
    title: "Mirai",
    mangaDetails: {
      image: manga.mangaInfo.thumb,
      name: manga.mangaInfo.title,
      summary: manga.mangaInfo.desc,
      release: "",
      views: "",
    },

    chapterList: manga.mangaInfo.chapterList,
  });
});
module.exports = router;
