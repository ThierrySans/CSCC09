var path = require('path');
var Datastore = require('nedb');
var db = new Datastore({ filename: path.join(__dirname, '..', 'db', 'messages.db'), autoload: true, timestampData : true});

exports.getMessages = function(callback){
    db.find({}).sort({createdAt:-1}).limit(10).exec(callback);
};

exports.addMessage = function(message, callback){
    db.insert(message, callback);
};