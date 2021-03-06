const express = require('express');
var app = express();
const http = require('http');
const path = require('path');
const md5=require('md5');
//var morgan = require('morgan'); //http request logger
var mongoose=require('mongoose');
const fileUpload = require('express-fileupload');
/*---------------------------

var mongodb = require('mongodb');
var MongoClient = mongodb.MongoClient;
var url ="mongodb://Esfera:esfera456@ds133547.mlab.com:33547/esferasoft";

------------------------------*/
mongoose.Promise = require('bluebird');
mongoose.connect('mongodb://monu:monu@ds261138.mlab.com:61138/apidb', { useMongoClient: true });

const favicon = require('serve-favicon');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');


// uncomment after placing your favicon in /public
app.use(favicon(path.join(__dirname, 'public', 'fav.png')));
app.use(fileUpload());

// create application/x-www-form-urlencoded parser
app.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
app.use(bodyParser.json());

app.use(cookieParser());
//app.use(morgan(':method :url :status :res[content-length] - :response-time ms'));
//Set Port
app.set('port', (process.env.PORT || 3000));
// Angular DIST output folder
app.use(express.static(path.join(__dirname, 'client/')));

// API location
/*------routes Define---------------------*/
const routes = require('./routes/index.js');
const Book = require('./routes/Book.js');

app.use('/', routes);
app.use('/books', Book);
/*---------routes end---------------------*/
// Send all other requests to the Angular app
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'client/index.html'));
});

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});

