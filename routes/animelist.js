var express = require('express');
const request = require('request');
const cheerio = require('cheerio');

var router = express.Router();

router.get('/', function(req, res, next) {
  var url = req.query.url;
  var series = [];
   // Fetch Gogoanime anime list links
  request(url,(error, response, html) => {    
      if(!error && response.statusCode == 200){
          const $ = cheerio.load(html);
  
          $('.container-left .container-item').each((i , el) => {
                
                 var index = $(el).find('.ci-title').text();
                 var linkstoindex = $(el).find('li');

                 var links = [];
                 linkstoindex.each((j, elx) => {
                    var info = {};
                    info.href=$(elx).find('a').attr('href');
                    info.text=$(elx).find('a').text();
                    links.push(info);
                 });

                 series.push({index , links});

          });
          res.render('animelist', { title: 'Nekkoto' ,series : series});
       
      }
      else{
          console.log(error);
      }
  });


});

module.exports = router;
