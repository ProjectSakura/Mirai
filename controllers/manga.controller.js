const mangaPark = require("../utils/mangapark");
const mangaParkObj = new mangaPark();

const RenderLatestManga = async (req, res, next) => {
    try{
        const data = await mangaParkObj.getLatestMangaData();
        res.render("latest", {
            title: "Mirai",
            latest: data.LatestManga,
        });
    }
    catch(err){
        console.log(err);
    }
};

const RenderLoadManga = async (req, res, next) => {
    try{
        var url = req.query.url;
        const manga = await mangaParkObj.getMangaInfo(url);
        res.render("loadmanga", {
            title: "Mirai",
            mangaDetails: {
                image: manga.mangaInfo.thumb,
                name: manga.mangaInfo.title,
                summary: manga.mangaInfo.desc,
                release: "",
                views: "",
            },

            chapterList: manga.mangaInfo.chapterList,
        });
    }
    catch(err){
        console.log(err);
    }
};

const RenderViewManga = async (req, res, next) => {
    try{
        const url = req.query.url;
        const image = await mangaParkObj.getImageList(url);
        const information = await mangaParkObj.getChapterInfo(url);
        res.render("viewmanga", {
            title: "Anime Master",
            images: image.images,
            details: information,
        });
    }
    catch(err){
        console.log(err);
    }
};

module.exports = {
    RenderLatestManga,
    RenderLoadManga,
    RenderViewManga,
};
