Date.prototype.addDays = function(day) {
    var d = new Date(this.valueOf());
    d.setDate(d.getDate() + day);

    return d;
};

Date.prototype.removeHour= function(hour){
    this.setHours(this.getHours()-hour);
    return this;
};

Date.prototype.removeSeconds = function(seconds) {
    var d = new Date(this.valueOf());
    d.setSeconds(d.getSeconds() - seconds);
    return d;
};

Date.prototype.yyyymmdd = function() {
    var yyyy = this.getFullYear().toString();
    var mm = (this.getMonth() + 1).toString(); // getMonth() is zero-based
    var dd  = this.getDate().toString();

    return yyyy + '-' + (mm[1] ? mm : "0" + mm[0]) + '-' + (dd[1] ? dd : "0" + dd[0]);
};

Date.prototype.dateDiff = function(datepart, fromdate, todate) {
    datepart = datepart.toLowerCase();
    var diff = todate - fromdate;
    var divideBy = { w:604800000, d:86400000, h:3600000, m:60000, s:1000 };

    return Math.floor(diff / divideBy[datepart]);
};


if (!Date.prototype.toISOString) {
    (function(){
        function pad(number) {
            if (number < 10) {
                return '0' + number;
            }

            return number;
        }

        Date.prototype.toISOString = function() {
            return this.getUTCFullYear() +
                '-' + pad( this.getUTCMonth() + 1 ) +
                '-' + pad( this.getUTCDate() ) +
                'T' + pad( this.getUTCHours() ) +
                ':' + pad( this.getUTCMinutes() ) +
                ':' + pad( this.getUTCSeconds() ) +
                '.' + (this.getUTCMilliseconds() / 1000).toFixed(3).slice(2, 5) +
                'Z';
        };
    }());
};

function twoDigits(d) {
    if(0 <= d && d < 10) return "0" + d.toString();
    if(-10 < d && d < 0) return "-0" + (-1*d).toString();

    return d.toString();
};