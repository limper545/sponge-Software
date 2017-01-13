var express = require('express');
var bodyParser = require('body-parser');
var app = express();

app.use(express.static('src'));
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(bodyParser.json());

//Loading Dependencies into the server
app.get('/node_modules/angular/angular.min.js', function (req, res) {
    res.sendFile('/node_modules/angular/angular.min.js', {
        root: __dirname
    });
});

app.get('/node_modules/bootstrap/dist/css/bootstrap.css', function (req, res) {
    res.sendFile('/node_modules/bootstrap/dist/css/bootstrap.css', {
        root: __dirname
    });
});

app.get('/node_modules/bootstrap/dist/js/bootstrap.min.js', function (req, res) {
    res.sendFile('/node_modules/bootstrap/dist/js/bootstrap.min.js', {
        root: __dirname
    });
});

app.get('/node_modules/jquery/dist/jquery.min.js', function (req, res) {
    res.sendFile('/node_modules/jquery/dist/jquery.min.js', {
        root: __dirname
    });
});

//Start of the normaly Server
app.get('/', function (req, res) {
    res.sendFile('src/index.html', {
        root: __dirname
    });
});

var server = app.listen(8555, function () {
    var host = server.address().address
    var port = server.address().port

    console.log('Listening at htpp://%s:%s', host, port);
});