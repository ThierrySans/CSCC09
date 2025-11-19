const path = require('path');
const Datastore = require('@seald-io/nedb');
const db = new Datastore({ filename: path.join(__dirname, '..', 'db', 'messages.db'), autoload: true, timestampData : true});

exports.getMessages = function(callback){
    db.find({}).sort({createdAt:-1}).limit(10).exec(callback);
};

exports.addMessage = function(message, callback){
    db.insert(message, callback);
};