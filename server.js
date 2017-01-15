var express = require('express');
var bodyParser = require('body-parser');
var request = require('request')
var uuid = require('node-uuid');
var http = require('http');
var mongoose = require('mongoose');
var morgan = require('morgan');
var path = require('path');
var connect = require('connect');
var app = express();
var server = require('http').createServer(app);
var io = require('socket.io')(server);



app.use(express.static(__dirname + '/src'));
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
    name: String,
    ID: String
});

var User = mongoose.model('User', userSchema, 'User');

var db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
    console.log("Connected to DB");

    /**  Wird benötigt, damit die Seite erneut geladen wird */
    app.use(function (req, res) {
        res.sendfile(__dirname + '/src/index.html');
    });
    port = 8555
    app.get('/', function (req, res, next) {
        res.sendFile(__dirname + '/index.html');
    });




    server.listen(port);

    //Socket Connection for Login
    io.on('connection', function (client) {
        console.log('Login started');
        client.on('login', function (data) {
            console.log("Daten erhalten: ", data);
            User.findOne({
                benutzerName: data.username,
                passwort: data.password
            }, function (err, result) {
                if (err) throw err;
                if (result === null) {
                    client.emit('dataOk', false);
                } else if (result !== null) {
                    client.emit('dataOk', data)
                }
            });
        })
    });
});

//Socket Connection for Registration
io.on('connection', function (client) {
    console.log('Registration started');
    client.on('regis', function (data) {
        console.log('Daten erhalten: ', data);
        var user = new User({
            benutzerName: data.username,
            passwort: data.passwort,
            email: data.email,
            name: data.name,
            ID: uuid.v1()
        });
        user.save(function (err) {
            if (err) thr
            if (!err) client.emit('dataOk', true)
        });
    })
});