const express = require("express");
const request = require("request");
const cheerio = require("cheerio");
const mangaPark = require("./mangapark");
const mangaParkObj = new mangaPark();
const router = express.Router();

// item.mangaLink = $(eld).children().first("a").attr("href");
// item.imageLink = $(eld).find("img").attr("src");
// item.views = $(eld).find(".aye_icon").text();
// item.description = $(eld).find("p").text();
// item.title = $(eld).find("h3 a").text();
// item.update = $(eld).find(".list-story-item-wrap-chapter").text();
// item.updateLink = $(eld);
router.get("/", async function (req, res, next) {
  const data = await mangaParkObj.getLatestMangaData();
  // console.log(data.LatestManga);
  res.render("latest", {
    title: "Mirai",
    latest: data.LatestManga,
  });
});
module.exports = router;
