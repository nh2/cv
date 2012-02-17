var http = require("http");
var mongodb = require('mongodb');
var express = require('express');
var request = require('request');


var server = new mongodb.Server("127.0.0.1", 27017, {});

new mongodb.Db('cv', server, {}).open(function (error, client) {
  if (error) throw error;
  var collection = new mongodb.Collection(client, 'cv_collection');
  console.log("database connected");
  var app = express.createServer();

  app.configure(function(){
    app.use(express.bodyParser());
    app.use(express.static(__dirname + '/public'));
  });

  app.get('/users/all', function(req, res, next){
    collection.find().toArray(function(err, results) {
      console.dir(results);
      res.send(JSON.stringify(results));
    });
  });

  app.get('/users/get/:id?', function(req, res, next){
      var uid = req.params.id;
      if (uid) {
        console.log(uid);
        collection.find({'uid': uid}, {limit: 1}).toArray(function(err, user) {
          console.dir(user[0]);
          res.send(JSON.stringify(user[0]));
        });
      } else {
          next();
      }
  });

  app.post('/users/put/', function(req, res) {

    var obj = req.body;

    collection.update({'uid': obj.uid}, obj, {upsert: true});

    res.send(req.body);
  });

  app.post('/login', function(req, res) {
    var assertion = req.body.assertion;
    var audience = req.body.audience;

    request.post({url: 'https://browserid.org/verify', json: {assertion: assertion, audience: audience}},
function(error, response, body) {
      console.log(body);
      res.send(body);
    });
  });

  app.listen(7777, "0.0.0.0");
});
