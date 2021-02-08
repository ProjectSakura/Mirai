var express = require("express");
const request = require("request");
const cheerio = require("cheerio");
const mangaPark = require("./mangaPark");
const mangaParkObj = new mangaPark();
var router = express.Router();

router.get("/", async function (req, res, next) {
  var url = req.query.url;
  // http://localhost:3000/viewmanga?url=https://mangakakalot.com/chapter/sd925573/chapter_1
  // https://mangapark.net/manga/solo-leveling/i2628794/c133
  var details = { name: "hello", back: "hello", next: "hello" };
  const image = await mangaParkObj.getImageList(url);
  // console.log(image);
  res.render("viewmanga", {
    title: "Anime Master",
    images: image.images,
    details: details,
  });

  // request(url, (error, response, html) => {
  //   if (!error && response.statusCode == 200) {
  //     const $ = cheerio.load(html);
  //     var images = [];
  //     details.name = $(".info-top-chapter").find("h2").text();
  //     details.back = $(".btn-navigation-chap").find(".next").attr("href");
  //     details.next = $(".btn-navigation-chap").find(".back").attr("href");
  //     $(".vung-doc img").each((i, el) => {
  //       images.push($(el).attr("src"));
  //     });
  //     //res.send(images);
  //     res.render("viewmanga", {
  //       title: "Anime Master",
  //       images: images,
  //       details: details,
  //     });
  //   } else {
  //     console.log(error);
  //   }
  // });
});
module.exports = router;
