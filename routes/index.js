var express = require("express");
const request = require("request");
const cheerio = require("cheerio");
const mangaPark = require("./mangapark");
const mangaParkObj = new mangaPark();
var router = express.Router();

/* GET home page. */
router.get("/", async function (req, res, next) {
  var navList = [];
  var updateList = [];
  var mangaUpdateList = [];
  var newAnimeList = [];
  var popularList = [];
  var ongoingList = [];
  var spotlight = [];

  // Fetch Gogoanime popular anime links
  request(
    "https://www.gogoanime1.com/home/popular-animes",
    (error, response, html) => {
      if (!error && response.statusCode == 200) {
        const $ = cheerio.load(html);

        $(".big-list .wide-anime-box").each((i, el) => {
          var anime = {};
          var genre = [];
          anime.picture = $(el).find(".anime-image").attr("style");
          anime.link = $(el).find(".anime-image").attr("href");
          anime.name = $(el).find(".wab-title a").text();
          anime.description = $(el).find(".wab-desc").text();
          $(el)
            .find(".wab-links a")
            .each((j, ex) => {
              genre.push($(ex).text());
            });
          anime.genre = genre;
          popularList.push(anime);
        });
      } else {
        console.log(error);
      }
    }
  );

  // Fetch Gogoanime latest up[date] links
  request("https://www.gogoanime1.com", (error, response, html) => {
    if (!error && response.statusCode == 200) {
      const $ = cheerio.load(html);

      $(".main-menu li").each((i, el) => {
        var link = {};
        link.href = $(el).find("a").attr("href");
        link.text = $(el).find("a").text();
        navList.push(link);
      });

      $(".animeList .nl-item").each((i, el) => {
        var update = {};
        update.mainLink = $(el).find(".nli-image").attr("href");
        update.imageLink = $(el).find(".nli-image img").attr("src");
        update.epLink = $(el).find(".nli-ep").attr("href");
        update.epName = $(el).find(".nli-ep").text();
        update.epUpdate = $(el).find(".release").text();
        updateList.push(update);
      });

      $(".tnTabber .bl-grid").each((i, el) => {
        var newanime = {};
        var genre = [];
        newanime.animeLink = $(el).find(".blb-image").attr("href");
        newanime.imageLink = $(el).find(".blb-image img").attr("src");
        newanime.animeTitle = $(el).find(".blb-title").text();
        $(el)
          .find(".blb-links a")
          .each((j, elv) => {
            genre.push($(elv).text());
          });
        newanime.genre = genre;
        newAnimeList.push(newanime);
      });
    } else {
      console.log(error);
    }
  });

  // Fetch Gogoanime latest up[date] links
  request(
    "https://www.gogoanime1.com/home/ongoing",
    (error, response, html) => {
      if (!error && response.statusCode == 200) {
        const $ = cheerio.load(html);

        $(".big-list .bl-grid").each((i, el) => {
          var ongoing = {};
          var genre = [];
          ongoing.mainLink = $(el).find(".blb-image").attr("href");
          ongoing.imageLink = $(el).find(".blb-image img").attr("src");
          ongoing.title = $(el).find(".blb-title").text();
          console.log(ongoing);
          $(el)
            .find(".blb-links a")
            .each((j, elj) => {
              if (j <= 20) {
                genre.push($(elj).text());
              }
              
            });
          ongoing.genre = genre;
          ongoingList.push(ongoing);
        });
        console.log(ongoingList);
      } else {
        console.log(error);
      }
    }
  );

  // Fetch Gogoanime latest manga links
  // getMangaList
  mangass = await mangaParkObj.getMangaList(1);
  // console.log(ongoingList);
  res.render("index", {
    title: "Mirai",
    navList: navList,
    updateList: updateList,
    mangaUpdateList: mangass.LatestManga,
    newAnimeList: newAnimeList,
    popularList: popularList,
    ongoingList: ongoingList,
  });
});

module.exports = router;
