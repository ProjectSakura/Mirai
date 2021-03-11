const express = require("express");
const request = require("request");
const cheerio = require("cheerio");

const router = express.Router();
let seriesDetails = {};
let navList = [];

// Fetch Gogoanime latest header links
request("https://www.gogoanime1.com", (error, response, html) => {
  if (!error && response.statusCode == 200) {
    const $ = cheerio.load(html);

    $(".main-menu li").each((i, el) => {
      let link = {};
      link.href = $(el).find("a").attr("href");
      link.text = $(el).find("a").text();
      navList.push(link);
    });
  } else {
    console.log(error);
  }
});

router.get("/", function (req, res, next) {
  let url = req.query.url;
  let episodeList = [];
  let detailer = [];
  request(url, (error, response, html) => {
    if (!error && response.statusCode == 200) {
      const $ = cheerio.load(html);
      //Get series details
      seriesDetails.name = $(".anime-title").text();
      seriesDetails.details = $(".anime-details").text();
      seriesDetails.image = $(".animeDetail-image").find("img").attr("src");
      seriesDetails.started = $(".animeDetail-tags").children().last().text();
      $(".animeDetail-tags .animeDetail-item").each((i, el) => {
        let detailsx = {};
        detailsx.name = $(el).find("span").text();
        detailsx.value = $(el).text();
        detailer.push(detailsx);
      });
      //Get episodes list and links
      let episodeDiv = $(".tnContent").attr("style", "display: none;");
      episodeDiv.find("li").each((i, el) => {
        let link = {};
        link.href = $(el).find("a").attr("href");
        link.episode = $(el).find("a").text();
        episodeList.push(link);
      });

      res.render("loadepisode", {
        title: "Mirai",
        navList: navList,
        episodeList: episodeList,
        seriesDetails: seriesDetails,
        detailer: detailer,
      });
    } else {
      console.log(error);
    }
  });
});
module.exports = router;
