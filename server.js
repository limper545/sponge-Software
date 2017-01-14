var express = require('express');
var bodyParser = require('body-parser');
var request = require('request')
var uuid = require('node-uuid');
var mongoose = require('mongoose');
var morgan = require('morgan');
var path = require('path');

var app = express();

app.use(express.static('src'));
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(bodyParser.json());

app.use('/node_modules', express.static(__dirname + '/node_modules'));


//Datenbank Verbindung
var dbHost = 'mongodb://192.168.192.44:27017/SpongeSoftware';
mongoose.connect(dbHost);

var userSchema = mongoose.Schema({
    benutzerName: String,
    passwort: String,
    email: String,
    vorName: String,
    nachName: String,
    ID: String
});

var User = mongoose.model('User', userSchema, 'User');

var db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
    console.log("Connected to DB");


    /*  app.get('/post', function (req, res) {
          console.log("Post Befehl ausgeführt");
          var user = new User({
              benutzerName: "String",
              passwort: "String",
              email: "String",
              vorName: "String",
              nachName: "String",
              ID: "String"
          });

          user.save(function (err) {
              if (err) thr

          })
      });*/

      app.get('/post', function(req, res) {
          console.log("POST befehl wurde erfolgereich ausgeführt1");
      })

      app.post('/post', function(req, res) {
          console.log("POST befehl wurde erfolgereich ausgeführt2");
      })

      app.get('/', function(req, res) {
          console.log("POST befehl wurde erfolgereich ausgeführt3");
      })

      app.post('/', function(req, res) {
          console.log("POST befehl wurde erfolgereich ausgeführt4");
      })



    var server = app.listen(8555, function () {
        var host = server.address().address
        var port = server.address().port

        console.log('Listening at htpp://%s:%s', host, port);
    });
});