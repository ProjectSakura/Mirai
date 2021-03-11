const express = require("express");
const request = require("request");
const cheerio = require("cheerio");

const router = express.Router();

router.get("/", function (req, res, next) {
  const url = req.query.url;
  let series = [];
  request(url, (error, response, html) => {
    if (!error && response.statusCode == 200) {
      const $ = cheerio.load(html);

      $(".container-left .container-item").each((i, el) => {
        let index = $(el).find(".ci-title").text();
        let linkstoindex = $(el).find("li");

        let links = [];
        linkstoindex.each((j, elx) => {
          let info = {};
          info.href = $(elx).find("a").attr("href");
          info.text = $(elx).find("a").text();
          links.push(info);
        });

        series.push({ index, links });
      });
      res.render("animelist", { title: "Mirai", series: series });
    } else {
      console.log(error);
    }
  });
});

module.exports = router;
