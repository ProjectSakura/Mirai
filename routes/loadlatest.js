var express = require("express");
const request = require("request");
const cheerio = require("cheerio");

var router = express.Router();

router.get("/", function (req, res, next) {
  var latest = [];
  request(
    "https://mangakakalot.com/manga_list?type=latest",
    (error, response, html) => {
      if (!error && response.statusCode == 200) {
        const $ = cheerio.load(html);
        $(".truyen-list .list-truyen-item-wrap").each((j, eld) => {
          var item = {};
          item.mangaLink = $(eld).children().first("a").attr("href");
          item.imageLink = $(eld).find("img").attr("src");
          item.views = $(eld).find(".aye_icon").text();
          item.description = $(eld).find("p").text();
          item.title = $(eld).find("h3 a").text();
          item.update = $(eld).find(".list-story-item-wrap-chapter").text();
          item.updateLink = $(eld)
            .find(".list-story-item-wrap-chapter")
            .attr("href");
          latest.push(item);
        });
        var total = $(".panel_page_number .group_qty").find("a").text();
        var links = [];
        $(".panel_page_number .group_page a").each((y, elx) => {
          var link = {};
          link.text = $(elx).text();
          link.href = $(elx).attr("href");
          link.class = $(elx).attr("class");
          links.push(link);
        });
        res.render("latest", {
          title: "Nekkoto",
          latest: latest,
          total: total,
          links: links,
        });
      } else {
        console.log(error);
      }
    }
  );
});
module.exports = router;
