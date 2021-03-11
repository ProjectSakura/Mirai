const request = require("request");
const mangaPark = require("../utils/mangapark");
const mangaParkObj = new mangaPark();

const SearchController = (req, res, next) => {
    request(
        "https://www.gogoanime1.com/search/topSearch?q=" + req.query.q,
        (error, response, html) => {
            res.send(response.body);
        }
    );
};

const MangaSearchController = async (req, res, next) => {
    let manga = await mangaParkObj.search(10, req.query.q, []);
    res.send(manga);
};

module.exports = {
    SearchController,
    MangaSearchController,
};