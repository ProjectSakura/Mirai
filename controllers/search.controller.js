const request = require("request");
const mangaPark = require("../utils/mangapark");
const mangaParkObj = new mangaPark();

const SearchController = (req, res, next) => {
    try{
        request(
            "https://www.gogoanime1.com/search/topSearch?q=" + req.query.q,
            (error, response, html) => {
                res.send(response.body);
            }
        );
    }
    catch(err){
        console.log(err);
    }
};

const MangaSearchController = async (req, res, next) => {
    try{
        let manga = await mangaParkObj.search(10, req.query.q, []);
        res.send(manga);
    }
    catch(err){
        console.log(err);
    }
};

module.exports = {
    SearchController,
    MangaSearchController,
};