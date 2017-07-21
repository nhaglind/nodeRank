var express = require('express');
var fs      = require('fs');
var request = require('request');
var cheerio = require('cheerio');
var app     = express();

app.get('/scrape', function(req, res){

url = 'http://www.espn.com/golf/leaderboard';

request(url, function(error, response, html) {
    if(!error) {

    var $ = cheerio.load(html);

    var name = [];
    var score = [];
    var json = { name : "", score : "" };

    $('.full-name').each(function(i, elem) {
      name[i] = $(this).text();
    });

    $('.relativeScore').each(function(i, elem) {
      score[i] = $(this).text();
    });

    name.join(', ');
    score.join(', ');

    json.name = name;
    json.score = score;

}


fs.writeFile('output.json', JSON.stringify(json, null, 4), function(err){

    console.log('File successfully written! - Check your project directory for the output.json file');

})

res.send('Check your console!')

    }) ;
})

app.listen('8081')
console.log('Magic happens on port 8081');
exports = module.exports = app;
