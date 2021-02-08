var express = require('express');
const request = require('request');
const cheerio = require('cheerio');

var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
    request('https://www.gogoanime1.com/search/topSearch?q='+req.query.q,
    (error, response, html) => {    
        
    res.send(response.body);
    });
   
 });

 router.get('/mangasearch', function(req, res, next) {
    request.post({url:'https://mangakakalot.com/home_json_search', formData : {searchword : req.query.q}}, function (err, httpResponse, body) {
    if (err) {
      return console.error('upload failed:', err);
    }
    res.send(body);
  });
   
 });

module.exports = router;
