var mysql = require('mysql');

var Database = (function () {
    var instance;
    var lastQuery;

    function init() {
        var connection = mysql.createConnection({
            host     : '178.62.51.216',
            database : 'chatserver',
            user     : 'chatserver',
            password : 'tubik123'
        });

        connection.connect(function(err) {
            if (err) {
                console.error('Error connecting: ' + err.stack);
                return;
            }
            console.log('Connected as id ' + connection.threadId);
        });

        return {
            executeQuery: function (sql, data, callback) {
                lastQuery = sql;
                connection.query(sql, data, function(err, result){
                    callback(err, result);
                });
            },
            getLastQuery : function () {
                return lastQuery;
            }
        };
    };

    return {
        getInstance: function () {
            if (!instance) {
                instance = init();
            }

            return instance;
        }
    };

})();

module.exports = Database;