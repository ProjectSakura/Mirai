var express = require("express");
const request = require("request");
const cheerio = require("cheerio");

var router = express.Router();

router.get("/", function (req, res, next) {
  var spotlight = [];
  var mostPopular = [];
  request("https://mangakakalot.com", (error, response, html) => {
    if (!error && response.statusCode == 200) {
      const $ = cheerio.load(html);
      $(".owl-carousel .item").each((j, eld) => {
        var spot = {};
        spot.imageLink = $(eld).find("img").attr("src");
        spot.mangaLink = $(eld).find("h3 a").attr("href");
        spot.mangaName = $(eld).find("h3 a").text();
        spot.update = $(eld).find(".slide-caption").children().last("a").text();
        spot.updateLink = $(eld)
          .find(".slide-caption")
          .children()
          .last("a")
          .attr("href");
        spotlight.push(spot);
      });

      $(".xem-nhieu .xem-nhieu-item").each((k, els) => {
        var xitem = {};
        xitem.link = $(els).find("h3 a").attr("href");
        xitem.name = $(els).find("h3 a").text();
        mostPopular.push(xitem);
      });
      res.render("popular", {
        title: "Mirai",
        spotlight: spotlight,
        mostPopular: mostPopular,
      });
    } else {
      console.log(error);
    }
  });
});
module.exports = router;
