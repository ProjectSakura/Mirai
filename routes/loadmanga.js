var express = require("express");
const request = require("request");
const cheerio = require("cheerio");

var router = express.Router();

router.get("/", function (req, res, next) {
  var url = req.query.url;
  var mangaDetails = {};
  var chapterList = [];
  request(url, (error, response, html) => {
    if (!error && response.statusCode == 200) {
      const $ = cheerio.load(html);
      //Get series details
      mangaDetails.image = $(".manga-info-pic img").attr("src");
      mangaDetails.name = $(".story-alternative").text();
      mangaDetails.summary = $("#noidungm").text();
      $(".chapter-list .row").each((i, el) => {
        var chapter = {};
        chapter.href = $(el).find("a").attr("href");
        chapter.title = $(el).find("a").attr("title");
        chapter.release = $(el).children().last().text();
        chapter.views = $(el).children().last().prev().text();
        chapterList.push(chapter);
      });
      chapterList = chapterList.reverse();
      res.render("loadmanga", {
        title: "Mirai",
        mangaDetails: mangaDetails,
        chapterList: chapterList,
      });
    } else {
      console.log(error);
    }
  });
});
module.exports = router;
