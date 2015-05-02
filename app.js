/**
 * Created by Halil İbrahim ŞAFAK on 02/05/15.
 */

var express = require('express');
var bodyParser = require('body-parser');

require("./libs/DateLibrary");
require("./libs/StringLibrary");

var app = express();
app.set('port', 8080);
app.use(bodyParser.json(true));

require('./controllers/ApiController')(app);
require('./controllers/SocketController')(app);

app.listen(app.get('port'),function(){
    console.log('Chat Server App is working on port:' + app.get('port'));
});