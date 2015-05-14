/**
 * Created by Halil İbrahim ŞAFAK on 02/05/15.
 */

var express = require('express');
var bodyParser = require('body-parser');
var path    = require('path');
var swig = require('swig');

require("./libs/DateLibrary");
require("./libs/StringLibrary");

var app = express();
app.set('port', 8080);
app.use(bodyParser.json(true));
app.use(express.static(path.join(__dirname, 'public')));
app.engine('html', swig.renderFile);
app.set('view engine', 'html');
app.set('views',__dirname + '/views');
app.set('view cache', false);
swig.setDefaults({ cache:false });

require('./controllers/ApiController')(app);
require('./controllers/SocketController');

app.listen(app.get('port'),function(){
    console.log('Chat Server App is working on port:' + app.get('port'));
});