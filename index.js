var fs = require('fs');
var express = require('express');
var app = express();
var http = require('http').Server(app);
var HtmlDom = require('htmldom');
var fetchUrl = require('fetch').fetchUrl;

var db = require('./nedb');

app.get('/', function (req, res) {
    res.json(db.types);
});

app.get('/:code', function (req, res) {
    var code = req.params.code;
    var size = db.types[code];

    if (size === undefined) {
        res.json([]);
        return;
    }

    var url = 'http://www.puzzle-loop.com/?size=' + size;
    fetchUrl(url, function (error, meta, body) {
        var data = body.toString();

        var html = new HtmlDom(data);
        var $ = html.$;

        var content = $('#LoopTable tr');

        var arr = [];
        for (var i = 0; i < content.length; i++) {
            if (i % 2 != 0) {
                var tr = content.eq(i);
                var tds = tr.find('td');

                for (var j = 0; j < tds.length; j++) {
                    if (j % 2 != 0) {
                        var td = tds.eq(j);
                        var value = -1;
                        if (td.html() != '') {
                            value = parseInt(td.html());
                        }

                        arr.push(value);
                    }
                }
            }
        }

        res.json(arr);
    });
});

/**
 * Server Listen
 */
http.listen(2389, function () {
    console.log('listening on localhost:2389');
});