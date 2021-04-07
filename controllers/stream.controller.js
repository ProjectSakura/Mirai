const fetch = require("node-fetch");
const cheerio = require("cheerio");

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

const RenderPlayEpisode = (req, res, next) => {
    let url = req.query.url;
    //generate series URL by exploding
    let split = url.split("/");
    let seriesUrl = split[0] + "//" + split[2] + "/" + split[3] + "/" + split[4];
    //request Episode List
    let episodeList = [];
    fetch(seriesUrl)
        .then(response => {
            if (response.ok) {   // response.status >= 200 & < 300
                return response.text();
            } else {
                throw Error(response.statusText);
            }
        })
        .then(html => {
            const $ = cheerio.load(html);
            //Get episodes list and links
            let episodeDiv = $(".ci-contents").last(".check-list");
            episodeDiv.find("li").each((i, el) => {
                let link = {};
                link.href = $(el).find("a").attr("href");
                link.episode = $(el).find("a").text();
                episodeList.push(link);
            });
            episodeList = episodeList.reverse();
            //request current episode data
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
                    let detailsEpisode = {};
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
                })
                .catch(err => {
                    console.error(err);
                })
        })
        .catch(err => {
            console.error(err);
            res.sendStatus(err.status || 500);
        })
};

const VideoURLController = (req, res) => {
    fetch(req.body.link)
        .then(response => {
            if (response.ok) {   // response.status >= 200 & < 300
                return response.text();
            } else {
                throw Error(response.statusText);
            }
        })
        .then(html => {
            const $ = cheerio.load(html);
            let detailsEpisode = {};
            detailsEpisode.name = $(".vmn-title").find("h1").text();
            detailsEpisode.downloadLink = $(".vmn-buttons")
                .children()
                .last()
                .attr("href");
            res.send(JSON.stringify(detailsEpisode));
        })
        .catch(err => {
            console.error(err);
            res.sendStatus(err.status || 500);
        })
};

module.exports = {
    RenderPlayEpisode,
    VideoURLController,
};