const http = require("https");
const cheerio = require("cheerio");

// getImageList;
// getMangaList;
// search;
// getLatestChapter;
// getMangaInfo;
// getGenre;
// getGenreManga;

class MangaPark {
  getLatestMangaData() {
    const url = "https://mangapark.net/latest";
    return new Promise((resolve, reject) => {
      http.get(url, (resp) => {
        let html = "";

        resp.on("data", (chunk) => {
          html += chunk;
        });

        resp.on("end", () => {
          try {
            const $ = cheerio.load(html);
            let mangaArr = [];
            let tempObj = {};

            if ($("body").find($(".no-match")).length !== 0) {
              resolve({
                LatestManga: [],
              });
            } else {
              $(".ls1")
                .children("div")
                .each((idx, el) => {
                  let title = $(el)
                    .children("ul")
                    .children("h3")
                    .children("a")
                    .text()
                    .trim();
                  let link = $(el)
                    .children("a")

                    .attr("href");
                  link = "https://mangapark.net" + link;
                  let imageLink = $(el)
                    .children("a")
                    .children("img")
                    .attr("data-cfsrc");
                  // item.mangaLink = $(eld).children().first("a").attr("href");
                  // item.imageLink = $(eld).find("img").attr("src");
                  // item.views = $(eld).find(".aye_icon").text();
                  // item.description = $(eld).find("p").text();
                  // item.title = $(eld).find("h3 a").text();
                  // item.update = $(eld).find(".list-story-item-wrap-chapter").text();
                  // item.updateLink = $(eld);
                  // console.log(title);
                  // console.log(link);
                  // console.log(imageLink);
                  tempObj = {
                    description: "",
                    title: title,
                    mangaLink: link,
                    imageLink: imageLink,
                    update: "",
                    updateLink: "",
                  };
                  mangaArr.push(tempObj);
                });

              resolve({
                LatestManga: mangaArr,
              });
            }
          } catch (e) {
            console.log(e);
          }
        });
      });
    });
  }
  getImageList(url) {
    url = url.substring(0, url.lastIndexOf("/"));
    return new Promise((resolve, reject) => {
      http.get(url, (resp) => {
        let html = "";

        resp.on("data", (chunk) => {
          html += chunk;
        });

        resp.on("end", () => {
          try {
            html = html.substring(html.indexOf("_load_pages"));
            html = html.substring(html.indexOf("["), html.indexOf(";"));
            let arr = eval(html);
            let img = [];
            for (let i of arr) {
              img.push(i.u);
            }
            // console.log(img);
            resolve({ images: img });
          } catch (error) {
            console.log(error);
          }
        });

        resp.on("error", () => {
          console.log(error);
        });
      });
    });
  }
  getChapterInfo(url) {
    // console.log(url);
    url = url.substring(0, url.lastIndexOf("/"));
    // console.log(url);
    return new Promise((resolve, reject) => {
      http.get(url, (resp) => {
        let html = "";

        resp.on("data", (chunk) => {
          html += chunk;
        });

        resp.on("end", () => {
          try {
            const $ = cheerio.load(html);
            let prev = $(".board")
              .children(".info")
              .children("div")
              .children("p")
              .eq(0)
              .children("a")
              .attr("href");
            let next = $(".board")
              .children(".info")
              .children("div")
              .children("p")
              .eq(1)
              .children("a")
              .attr("href");
            prev = "https://mangapark.net" + prev;
            next = "https://mangapark.net" + next;
            const title = $(".page")
              .children(".content")
              .children("h2")
              .text()
              .replace("Webtoon", "")
              .trim();
            // console.log(title);
            resolve({ name: title, next: next, back: prev });
          } catch (e) {
            console.log(e);
          }
        });
      });
    });
  }

  getMangaList(pageNo) {
    let url = `https://mangapark.net/search?orderby=views_a&genres-exclude=smut&orderby=views_m&page=${pageNo}`;
    return new Promise((resolve, reject) => {
      http.get(url, (resp) => {
        let html = "";

        resp.on("data", (chunk) => {
          html += chunk;
        });

        resp.on("end", () => {
          try {
            const $ = cheerio.load(html);
            let mangaArr = [];
            let tempObj = {};
            if ($("body").find($(".no-match")).length !== 0) {
              resolve({
                LatestManga: [],
              });
            } else {
              $(".manga-list")
                .children(".item")
                .each((idx, el) => {
                  let title = $(el)
                    .children("table")
                    .children("tbody")
                    .children("tr")
                    .children("td")
                    .eq(1)
                    .children("h2")
                    .children("a")
                    .text()
                    .trim();
                  let link = $(el)
                    .children("table")
                    .children("tbody")
                    .children("tr")
                    .children("td")
                    .eq(1)
                    .children("h2")
                    .children("a")
                    .attr("href");
                  link = "https://mangapark.net" + link;
                  let imageLink = $(el)
                    .children("table")
                    .children("tbody")
                    .children("tr")
                    .children("td")
                    .eq(0)
                    .children("a")
                    .children("img")
                    .attr("data-cfsrc");
                  tempObj = {
                    description: "",
                    mangaName: title,
                    mangaLink: link,
                    imageLink: imageLink,
                  };

                  mangaArr.push(tempObj);
                });

              resolve({
                LatestManga: mangaArr,
              });
            }
          } catch (error) {
            console.log(error);
          }
        });
      });
    });
  }

  search(maxItem, title, finalArray) {
    return new Promise((resolve, reject) => {
      let url =
        "https://mangapark.net/search?orderby=views_a&q=" + encodeURI(title);
      //   console.log(url);
      http.get(url, (resp) => {
        let html = "";

        resp.on("data", (chunk) => {
          html += chunk;
        });

        resp.on("end", () => {
          try {
            const $ = cheerio.load(html);
            for (let i = 0; i < maxItem; i++) {
              if (
                $(".manga-list")
                  .children(".item")
                  .eq(i)
                  .children("table")
                  .children("tbody")
                  .children("tr")
                  .children("td")
                  .eq(1)
                  .children("h2")
                  .children("a")
                  .text()
                  .trim()
              ) {
                finalArray.push({
                  src: "MGPK",
                  thumb: $(".manga-list")
                    .children(".item")
                    .eq(i)
                    .children("table")
                    .children("tbody")
                    .children("tr")
                    .children("td")
                    .eq(0)
                    .children("a")
                    .children("img")
                    .attr("data-cfsrc"),
                  link:
                    "https://mangapark.net" +
                    $(".manga-list")
                      .children(".item")
                      .eq(i)
                      .children("table")
                      .children("tbody")
                      .children("tr")
                      .children("td")
                      .eq(1)
                      .children("h2")
                      .children("a")
                      .attr("href"),
                  title: $(".manga-list")
                    .children(".item")
                    .eq(i)
                    .children("table")
                    .children("tbody")
                    .children("tr")
                    .children("td")
                    .eq(1)
                    .children("h2")
                    .children("a")
                    .text()
                    .trim(),
                });
              }
            }
          } catch (e) {
            console.log(e);
          } finally {
            // console.log(finalArray);
            resolve(finalArray);
          }
        });
      });
    });
  }

  getLatestChapter(url) {
    return new Promise((resolve, reject) => {
      http.get(url, (resp) => {
        let html = "";

        resp.on("data", (chunk) => {
          html += chunk;
        });

        resp.on("end", () => {
          try {
            const $ = cheerio.load(html);
            let streamLen = [];
            let maxStreams = 0;

            maxStreams = $(".stream").length;

            for (let i = 0; i < maxStreams; i++) {
              streamLen.push(
                $(".stream")
                  .eq(i)
                  .children("div")
                  .eq(0)
                  .children("div")
                  .eq(0)
                  .children("span")
                  .text()
              );
            }

            for (let i = 0; i < maxStreams; i++) {
              streamLen[i] = parseInt(streamLen[i].substring(1, 4));
            }

            let bestStream = streamLen.indexOf(Math.max(...streamLen));

            resolve({
              message: $(".stream")
                .eq(bestStream)
                .find(".tit")
                .eq(0)
                .children("a")
                .text(),
            });
          } catch (error) {
            console.log(e);
          }
        });
      });
    });
  }

  getMangaInfo(url) {
    return new Promise((resolve, reject) => {
      http.get(url, (resp) => {
        // console.log(url);
        let html = "";
        resp.on("data", (chunk) => {
          html += chunk;
        });

        resp.on("end", () => {
          try {
            const $ = cheerio.load(html);
            let thumb = $(".cover").children("img").attr("data-cfsrc");
            let title = $(".pb-1").children("h2").children("a").text();
            let desc = $(".summary").text();
            if (desc.indexOf("[") !== -1) {
              desc = desc.substring(0, desc.indexOf("["));
            }
            let status = $(".attr")
              .children("tbody")
              .children("tr")
              .eq(8)
              .children("td")
              .text()
              .trim();
            let author = $(".attr")
              .children("tbody")
              .children("tr")
              .eq(4)
              .children("td")
              .text()
              .trim();

            let chapterList = [];
            let chapObj = {};

            //FIND OUT WHICH STREAM HAS MOST CHAPTERS

            let streamLen = [];
            let maxStreams = 0;

            maxStreams = $(".stream").length;

            for (let i = 0; i < maxStreams; i++) {
              streamLen.push(
                $(".stream")
                  .eq(i)
                  .children("div")
                  .eq(0)
                  .children("div")
                  .eq(0)
                  .children("span")
                  .text()
              );
            }

            for (let i = 0; i < maxStreams; i++) {
              streamLen[i] = parseInt(streamLen[i].substring(1, 4));
            }

            let bestStream = streamLen.indexOf(Math.max(...streamLen));

            $(".stream")
              .eq(bestStream)
              .find(".tit")
              .each((i, el) => {
                let chapDate = $(el)
                  .parent()
                  .children(".ext")
                  .children(".time")
                  .text();
                chapDate = chapDate.replace(/\n+/g, "");
                chapDate = chapDate.trim();

                chapObj = {
                  title: $(el).children("a").text(),
                  href:
                    "https://mangapark.net" + $(el).children("a").attr("href"),
                  release: chapDate,
                  views: "",
                };
                chapterList.push(chapObj);
              });
            resolve({
              mangaInfo: {
                thumb: thumb,
                title: title,
                desc: desc,
                status: status,
                author: author,
                lastUpdate: "",
                chapterList: chapterList,
              },
            });
          } catch (e) {
            console.log(e);
          }
        });
      });
    });
  }

  getGenre() {
    return new Promise((resolve, reject) => {
      let url = "https://mangapark.net/genre";
      let genreList = [];
      http.get(url, (resp) => {
        let html = "";

        resp.on("data", (chunk) => {
          html += chunk;
        });

        resp.on("end", () => {
          try {
            const $ = cheerio.load(html);
            $("#top-genres")
              .children(".items")
              .children("div")
              .each((i, el) => {
                genreList.push({
                  link:
                    "https://mangapark.net" +
                    $(el).children("a").eq(0).attr("href"),
                  title: $(el).children("a").eq(0).text(),
                });
              });

            resolve({ genreList: genreList });
          } catch (e) {
            console.log(e);
          }
        });
      });
    });
  }

  getGenreManga(link, page) {
    return new Promise((resolve, reject) => {
      let url = link + `/${page}?views_t`;
      http.get(url, (resp) => {
        let html = "";

        resp.on("data", (chunk) => {
          html += chunk;
        });

        resp.on("end", () => {
          try {
            const $ = cheerio.load(html);
            let mangaArr = [];
            let tempObj = {};

            if ($("body").find($(".no-match")).length !== 0) {
              resolve({
                LatestManga: [],
              });
            } else {
              $(".ls1")
                .children("div")
                .each((idx, el) => {
                  let title = $(el)
                    .children("div")
                    .children("h3")
                    .children("a")
                    .text()
                    .trim();
                  let link = $(el)
                    .children("div")
                    .children("h3")
                    .children("a")
                    .attr("href");
                  link = "https://mangapark.net" + link;
                  let imageLink = $(el)
                    .children("a")
                    .children("img")
                    .attr("data-cfsrc");
                  tempObj = {
                    description: "",
                    title: title,
                    link: link,
                    thumb: imageLink,
                  };
                  mangaArr.push(tempObj);
                });

              resolve({
                LatestManga: mangaArr,
              });
            }
          } catch (e) {
            console.log(e);
          }
        });
      });
    });
  }
}

module.exports = MangaPark;
