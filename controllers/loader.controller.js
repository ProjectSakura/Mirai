const fetch = require("node-fetch");
const cheerio = require("cheerio");

let seriesDetails = {};
let navList = [];

// Fetch Gogoanime latest header links
fetch("https://www.gogoanime1.com")
    .then(response => {
        if (response.ok) {   // response.status >= 200 & < 300
            return response.text();
        } else {
            throw Error(response.statusText);
        }
    })
    .then(html => {
        const $ = cheerio.load(html);

        $(".main-menu li").each((i, el) => {
            let link = {};
            link.href = $(el).find("a").attr("href");
            link.text = $(el).find("a").text();
            navList.push(link);
        });
    })
    .catch(err => {
        console.error(err);
    })

const RenderAnimeList = (req, res, next) => {
    const url = req.query.url;
    let series = [];
    fetch(url)
        .then(response => {
            if (response.ok) {   // response.status >= 200 & < 300
                return response.text();
            } else {
                throw Error(response.statusText);
            }
        })
        .then(html => {
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
        })
        .catch(err => {
            console.error(err);
            res.sendStatus(err.status || 500);
        })
};

const LoaderController = (req, res, next) => {
    let latestk = [];
    let url = req.body.link;
    fetch(url)
        .then(response => {
            if (response.ok) {   // response.status >= 200 & < 300
                return response.text();
            } else {
                throw Error(response.statusText);
            }
        })
        .then(html => {
            const $ = cheerio.load(html);
            $(".truyen-list .list-truyen-item-wrap").each((j, eld) => {
                let item = {};
                item.mangaLink = $(eld).children().first("a").attr("href");
                item.imageLink = $(eld).find("img").attr("src");
                item.views = $(eld).find(".aye_icon").text();
                item.description = $(eld).find("p").text();
                item.title = $(eld).find("h3 a").text();
                item.update = $(eld).find(".list-story-item-wrap-chapter").text();
                item.updateLink = $(eld)
                    .find(".list-story-item-wrap-chapter")
                    .attr("href");
                latestk.push(item);
            });
            let total = $(".panel_page_number .group_qty").find("a").text();
            let linksk = [];
            $(".panel_page_number .group_page a").each((y, elx) => {
                let link = {};
                link.text = $(elx).text();
                link.href = $(elx).attr("href");
                link.class = $(elx).attr("class");
                linksk.push(link);
            });

            res.render("latest", {
                title: "Mirai",
                latest: latestk,
                total: total,
                links: linksk,
            });
        })
        .catch(err => {
            console.error(err);
            res.sendStatus(err.status || 500);
        })
};

const RenderLoadEpisodes = (req, res, next) => {
    let url = req.query.url;
    let episodeList = [];
    let detailer = [];
    fetch(url)
        .then(response => {
            if (response.ok) {   // response.status >= 200 & < 300
                return response.text();
            } else {
                throw Error(response.statusText);
            }
        })
        .then(html => {
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
        })
        .catch(err => {
            console.error(err);
            res.sendStatus(err.status || 500);
        })
};

const RenderNewLoader = (req, res, next) => {
    let latestk = [];
    let url = req.body.link;
    fetch(url)
        .then(response => {
            if (response.ok) {   // response.status >= 200 & < 300
                return response.text();
            } else {
                throw Error(response.statusText);
            }
        })
        .then(html => {
            const $ = cheerio.load(html);
            $(".truyen-list .list-truyen-item-wrap").each((j, eld) => {
                let item = {};
                item.mangaLink = $(eld).children().first("a").attr("href");
                item.imageLink = $(eld).find("img").attr("src");
                item.views = $(eld).find(".aye_icon").text();
                item.description = $(eld).find("p").text();
                item.title = $(eld).find("h3 a").text();
                item.update = $(eld).find(".list-story-item-wrap-chapter").text();
                item.updateLink = $(eld)
                    .find(".list-story-item-wrap-chapter")
                    .attr("href");
                latestk.push(item);
            });
            let total = $(".panel_page_number .group_qty").find("a").text();
            let linksk = [];
            $(".panel_page_number .group_page a").each((y, elx) => {
                let link = {};
                link.text = $(elx).text();
                link.href = $(elx).attr("href");
                link.class = $(elx).attr("class");
                linksk.push(link);
            });

            res.render("newloader", {
                title: "Mirai",
                latest: latestk,
                total: total,
                links: linksk,
            });
        })
        .catch(err => {
            console.error(err);
            res.sendStatus(err.status || 500);
        })
};

module.exports = {
    RenderAnimeList,
    LoaderController,
    RenderLoadEpisodes,
    RenderNewLoader
};
