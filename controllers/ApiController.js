/**
 * Created by Halil İbrahim ŞAFAK on 02/05/15.
 */

var User = require('../models/UserModel');
var Room = require('../models/RoomModel');

var ApiController = function (app) {
    var user = new User();
    var room = new Room();

    app.get('/', function (request, response) {
        var authKey = request.get('X-AUTH-TOKEN');
        user.auth(authKey, function (status, result) {
            response.status(status);
            response.json(result);
        });
    });

    app.post('/login', function (request, response) {
        var username = request.body.username;
        var password = request.body.password;

        user.login(username, password, function (status, result) {
            response.status(status);
            response.json(result);
        });
    });

    app.get('/rooms', function (request, response) {
        var authKey = request.get('X-AUTH-TOKEN');
        room.rooms(authKey, function (status, result) {
            response.status(status);
            response.json(result);
        });
    });

    app.post('/rooms/:id/join', function (request, response) {
        var authKey = request.get('X-AUTH-TOKEN');
        var roomId = request.params.id;

        room.join(roomId, authKey, function (status, result) {
            response.status(status);
            response.json(result);
        });
    });

    app.get('/rooms/:id/messages', function (request, response) {
        var authKey = request.get('X-AUTH-TOKEN');
        var roomId = request.params.id;

        room.messages(roomId, authKey, function (status, result) {
            response.status(status);
            response.json(result);
        });
    });
};

module.exports = ApiController;