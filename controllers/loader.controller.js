const request = require("request");
const cheerio = require("cheerio");

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

const RenderAnimeList = (req, res, next) => {
    try{
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
    }
    catch(err){
        console.log(err);
    }
};

const LoaderController = (req, res, next) => {
    try{
        let latestk = [];
        let url = req.body.link;
        request(url, (error, response, html) => {
            if (!error && response.statusCode == 200) {
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
            } else {
                console.log(error);
            }
        });
    }
    catch(err){
        console.log(err);
    }
};

const RenderLoadEpisodes = (req, res, next) => {
    try{
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
    }
    catch(err){
        console.log(err);
    }
};

const RenderNewLoader = (req, res, next) => {
    try{
        let latestk = [];
        let url = req.body.link;
        request(url, (error, response, html) => {
            if (!error && response.statusCode == 200) {
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
            } else {
                console.log(error);
            }
        });
    }
    catch(err){
        console.log(err);
    }
};

module.exports = {
    RenderAnimeList,
    LoaderController,
    RenderLoadEpisodes,
    RenderNewLoader
};
