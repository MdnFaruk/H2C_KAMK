"use strict";
var President = require('./model/president.js');

var dbUrl = "mongodb://mongodb-server:27017/presidents";

class Database {
  constructor() {
    this.mongoose = require('mongoose');

    console.log("trying to connect mongodb database");
    this.mongoose.connect(dbUrl, { useNewUrlParser: true });
  
    this.db = this.mongoose.connection;
    this.db.on('error', console.error.bind(console, 'connection error:'));
    this.db.once('open', function() {
      console.log("we're connected!");
    });
  }
  
  getAll(callback) {
    console.log("get all presidents from mongodb")
    President.find(function(err, presidents) {
      if(err) {
        callback({operation: "failed"});
      } else {
        console.log("got", presidents);
        callback(presidents);
      }
    });
  }

  addPresidents(callback, data) {
    console.log("poatch insert presidents");
    President.insertMany(data, function(err, response) {
      if(err) {
        callback(err);
      } else {
       callback(response);
      }
    });
  }
};

module.exports = Database;