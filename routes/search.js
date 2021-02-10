var express = require("express");
const request = require("request");
const cheerio = require("cheerio");
const mangaPark = require("./mangapark");
const mangaParkObj = new mangaPark();

var router = express.Router();

router.get("/", function (req, res, next) {
  request(
    "https://www.gogoanime1.com/search/topSearch?q=" + req.query.q,
    (error, response, html) => {
      res.send(response.body);
    }
  );
});

router.get("/mangasearch", async function (req, res, next) {
  let manga = await mangaParkObj.search(10, req.query.q, []);
  res.send(manga);
});

module.exports = router;
