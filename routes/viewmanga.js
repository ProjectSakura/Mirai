var express = require("express");
const request = require("request");
const cheerio = require("cheerio");
const got = require("got");
var FileReader = require("filereader");
const Base64 = require("js-base64");

const fs = require("fs");

var router = express.Router();

router.get("/", async function (req, res, next) {
  var url = req.query.url;
  var details = {};
  request(url, async (error, response, html) => {
    if (!error && response.statusCode == 200) {
      const $ = await cheerio.load(html);
      var images = [];
      var images2 = [];
      details.name = $(".info-top-chapter").find("h2").text();
      console.log(details.name);
      details.back = $(".btn-navigation-chap").find(".next").attr("href");
      details.next = $(".btn-navigation-chap").find(".back").attr("href");
      $(".container-chapter-reader img").each((i, el) => {
        images.push($(el).attr("src"));
      });

      images2 = await images.map((image) => {
        const options = {
          headers: {
            Referer: "https://mangakakalot.com/",
          },
        };
        const data = got(image, options)
          .then((result) => {
            return result.body;
          })
          .catch((err) => {
            console.log(err);
          });
        return data;
      });
      const vals = await Promise.allSettled(images2);
      const values = vals.map((elem) => {
        return "data:image/png;base64," + Base64.encode(elem.value);
      });
      res.render("viewmanga", {
        title: "Mirai",
        images: values,
        details: details,
      });
    } else {
      console.log(error);
    }
  });
});
module.exports = router;
