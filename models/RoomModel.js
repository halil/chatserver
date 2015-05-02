/**
 * Created by Halil İbrahim ŞAFAK on 02/05/15.
 */

var DB = require('../libs/ConnectionLibrary').getInstance();
var User = require('../models/UserModel');

var RoomModel = function () {
    this.user = new User();
};

RoomModel.prototype.rooms = function (authKey, callback) {
    this.user.auth(authKey, function (status, result) {
        if(status === 200) {
            DB.executeQuery("SELECT * FROM rooms", null, function (err, result) {
                if(!err) {
                    if(result.length > 0) {
                        callback(200, {"status" : "ok", "rooms" : result});
                    } else {
                        callback(400, {"status" : "error"});
                    }
                } else {
                    callback(500, {"status" : "error"});
                }
            });
        } else {
            callback(status, result);
        }
    });
};

RoomModel.prototype.join = function (roomId, authKey, callback) {
    this.user.auth(authKey, function (status, authResult) {
        if(status === 200) {
            DB.executeQuery("SELECT * FROM roomUsers WHERE roomId = ? AND userId = ?", [roomId, authResult.user.userId], function (err, result) {
                if(!err) {
                    if(result.length > 0) {
                        DB.executeQuery("UPDATE roomUsers SET lastConnectedDate = NOW() WHERE roomId = ? AND userId = ?", [roomId, authResult.user.userId], function (err, result) {
                            if(!err) {
                                callback(200, {"status" : "ok"});
                            } else {
                                callback(400, {"status" : "error"});
                            }
                        });
                    } else {
                        DB.executeQuery("INSERT INTO roomUsers (roomId, userId, lastConnectedDate) VALUES ( ?, ?, NOW())", [roomId, authResult.user.userId], function (err, result) {
                            if(!err) {
                                callback(201, {"status" : "ok"});
                            } else {
                                callback(400, {"status" : "error"});
                            }
                        });
                    }
                } else {
                    callback(500, {"status" : "error"});
                }
            });
        } else {
            callback(status, authResult);
        }
    });
};

RoomModel.prototype.messages = function (roomId, authKey, callback) {
    this.user.auth(authKey, function (status, authResult) {
        if(status === 200) {
            DB.executeQuery("SELECT m.message, u.username, m.messageDate FROM messages AS m " +
            "INNER JOIN users AS u ON u.userId = m.userId " +
            "WHERE m.roomId = ? ORDER BY m.messageDate", roomId, function (err, result) {
                if(!err) {
                    callback(200, {"status" : "ok", "messages" : result});
                } else {
                    callback(500, {"status" : "error"});
                }
            });
        } else {
            callback(status, authResult);
        }
    });
};

module.exports = RoomModel;