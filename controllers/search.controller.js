const fetch = require("node-fetch");
const mangaPark = require("../utils/mangapark");
const mangaParkObj = new mangaPark();

const SearchController = (req, res, next) => {
    fetch("https://www.gogoanime1.com/search/topSearch?q=" + req.query.q)
        .then(response => {
            if (response.ok) {   // response.status >= 200 & < 300
                return response.json(); // this API endpoint returns json
            } else {
                throw Error(response.statusText);
            }
        })
        .then(json => {
            res.send(json);
        })
        .catch(err => {
            console.error(err);

            res.sendStatus(err.status || 500)
        })
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