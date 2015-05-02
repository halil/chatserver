/**
 * Created by Halil İbrahim ŞAFAK on 02/05/15.
 */

var DB = require('../libs/ConnectionLibrary').getInstance();
var crypto = require('crypto');

var UserModel = function () {

};

UserModel.prototype.auth = function (authKey, callback) {
    DB.executeQuery("SELECT * FROM users WHERE authKey = ? AND expireDate > NOW()", authKey, function (err, result) {
        if(!err) {
            if(result.length > 0) {
                //callback(200, {"status" : "ok", "auth" : {"key" : result[0].authKey, "expireDate" : result[0].expireDate}});
                callback(200, {"status" : "ok", "user" : result[0]});
            } else {
                callback(401, {"status" : "error"});
            }
        } else {
            callback(500, {"status" : "error"});
        }
    });
};

UserModel.prototype.login = function (username, password, callback) {
    DB.executeQuery("SELECT * FROM users WHERE username = ?", username, function (err, result) {
        if(!err) {
            if(result.length > 0) {
                if(result[0].password == crypto.createHash('md5').update("" + password).digest("hex")) {
                    callback(200, {"status" : "ok", "auth" : {"key" : result[0].authKey, "expireDate" : result[0].expireDate}});
                } else {
                    callback(400, {"status" : "error"});
                }
            } else {
                callback(400, {"status" : "error"});
            }
        } else {
            callback(500, {"status" : "error"});
        }
    });
};

UserModel.prototype.signup = function (username, password, email, callback) {

};

var errorBuilder = function (code, message) {
    return {"code" : code, "message" : message};
};

module.exports = UserModel;