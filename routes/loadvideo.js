var express = require("express");
const request = require("request");
const cheerio = require("cheerio");

var router = express.Router();
var navList = [];

// Fetch Gogoanime latest header links
request("https://www.gogoanime1.com", (error, response, html) => {
  if (!error && response.statusCode == 200) {
    const $ = cheerio.load(html);

    $(".main-menu li").each((i, el) => {
      var link = {};
      link.href = $(el).find("a").attr("href");
      link.text = $(el).find("a").text();
      navList.push(link);
    });
  } else {
    console.log(error);
  }
});

router.get("/", function (req, res, next) {
  var url = req.query.url;
  //generate series URL by exploding
  var split = url.split("/");
  var seriesUrl = split[0] + "//" + split[2] + "/" + split[3] + "/" + split[4];
  //request Episode List
  var episodeList = [];
  request(seriesUrl, (error, response, html) => {
    if (!error && response.statusCode == 200) {
      const $ = cheerio.load(html);
      //Get episodes list and links
      var episodeDiv = $(".ci-contents").last(".check-list");
      episodeDiv.find("li").each((i, el) => {
        var link = {};
        link.href = $(el).find("a").attr("href");
        link.episode = $(el).find("a").text();
        episodeList.push(link);
      });
      episodeList = episodeList.reverse();
      //request current episode data
      request(url, (error, response, html) => {
        if (!error && response.statusCode == 200) {
          const $ = cheerio.load(html);
          var detailsEpisode = {};
          detailsEpisode.name = $(".vmn-title").find("h1").text();
          detailsEpisode.downloadLink = $(".vmn-buttons")
            .children()
            .last()
            .attr("href");
          res.render("playepisode", {
            title: "Mirai",
            navList: navList,
            detailsEpisode: detailsEpisode,
            seriesUrl: seriesUrl,
            episodeList: episodeList,
            url: url,
          });
        } else {
          console.log(error);
        }
      });
    } else {
      console.log(error);
    }
  });
});

// POST method route
router.post("/getVideoUrl", function (req, res) {
  request(req.body.link, (error, response, html) => {
    if (!error && response.statusCode == 200) {
      const $ = cheerio.load(html);
      var detailsEpisode = {};
      detailsEpisode.name = $(".vmn-title").find("h1").text();
      detailsEpisode.downloadLink = $(".vmn-buttons")
        .children()
        .last()
        .attr("href");
      res.send(JSON.stringify(detailsEpisode));
    } else {
      console.log(error);
    }
  });
});
module.exports = router;
