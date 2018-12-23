var https = require('https');
var cheerio = require('cheerio');
var iconv = require('iconv-lite');

var hostname='hz.fang.anjuke.com';

function showHtml(html) {
    var $=cheerio.load(html);
    var lpList=$(".key-list");
    lpList.find(".item-mod").each(function (index,ele) {
        //console.log($(ele).find('.xst').text());
        var lpName=$(ele).find('.items-name').text();
        var lpStatus=$(ele).find('.status-icon').text();
        var price=$(ele).find('.price').text();
        console.log(lpName + '-------' + lpStatus + '-------' + price);
    })
}

for (var i=2; i<100; i++ ) {
    var html=''
    var path='/loupan/all/p' + i + '/';
    var option={
        hostname: hostname,
        port: 443,
        path: path
    }
    https.request(option, function (response) {
        response.on('data', function (chunk) {
            html += iconv.decode(chunk, 'utf8').toString()
        });
        response.on('end', function () {
            showHtml(html);
        })
    }).end();
}