var express = require('express');
const request = require('request');
const cheerio = require('cheerio');

var router = express.Router();

router.get('/', function(req, res, next) {
  request('https://www.gogoanime1.com/watch/tate-no-yuusha-no-nariagari/episode/episode-21',(error, response, html) => {    
    if(!error && response.statusCode == 200){
      const $ = cheerio.load(html);
      var scripts = [];
      var links = [];
      var string = '<pre>';

        $('script').each((i, el) => {
          //scripts.push({ id : i,markup : $(el).html()});
          //console.log($(el).html());
          string += $(el).html();
        });
        string = string + '</pre>';
        //EXPLODE string
        var split = string.split('"');
        //Search for substring
        split.forEach(element => {
          if(element.includes('[HorribleSubs]')){
          links.push(element);
          }
        });
        //LOG LInks
        res.send(links);
     //   res.send(string);
    }
    else{
      res.send(error);
    }
  });
});


module.exports = router;
