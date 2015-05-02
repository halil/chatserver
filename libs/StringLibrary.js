String.prototype.replaceAll = function(token, newToken, ignoreCase) {
    var _token;
    var str = this + "";
    var i = -1;

    if (typeof token === "string") {
        if (ignoreCase) {
            _token = token.toLowerCase();
            while((i = str.toLowerCase().indexOf(token, i >= 0 ? i + newToken.length : 0)) !== -1) {
                str = str.substring(0, i) + newToken + str.substring(i + token.length);
            }
        } else {
            return this.split(token).join(newToken);
        }
    }

    return str;
};

String.prototype.isMail = function() {
    var pattern = /^([-\w\d\.]+)(?:\s+at\s+|\s*@\s*|\s*(?:[\[\]@]){3}\s*)([-\w\d\.]*)\s*(?:dot|\.|(?:[\[\]dot\.]){3,5})\s*(\w+)$/;

    if(pattern.test(this)){
        return true;
    } else {
        return false;
    }
};

String.prototype.randomString = function random (howMany, chars) {
    var crypto = require('crypto');
    chars = chars || "abcdefghijklmnopqrstuwxyzABCDEFGHIJKLMNOPQRSTUWXYZ0123456789";
    var rnd = crypto.randomBytes(howMany);
    var value = new Array(howMany);
    var len = chars.length;

    for (var i = 0; i < howMany; i++) {
        value[i] = chars[rnd[i] % len];
    }

    return value.join('');
};

String.prototype.turkishToUpper = function() {
    var string = this;
    var letters = { "i": "İ", "ş": "Ş", "ğ": "Ğ", "ü": "Ü", "ö": "Ö", "ç": "Ç", "ı": "I" };
    string = string.replace(/(([iışğüçö]))/g, function(letter) {
        return letters[letter];
    });

    return string.toUpperCase();
};

String.prototype.turkishToLower = function() {
    var string = this;
    var letters = { "İ": "i", "I": "ı", "Ş": "ş", "Ğ": "ğ", "Ü": "ü", "Ö": "ö", "Ç": "ç" };
    string = string.replace(/(([İIŞĞÜÇÖ]))/g, function(letter) {
        return letters[letter];
    });

    return string.toLowerCase();
};

String.prototype.turkishToLowerEnglishCharacter = function() {
    var string = this;
    var letters = { "İ": "i", "Ş": "s", "Ğ": "g", "Ü": "u", "Ö": "o", "Ç": "c",
        "ş": "s", "ğ": "g", "ü": "u", "ö": "o", "ç": "c", "ı": "i"};
    string = string.replace(/(([İŞĞÜÇÖışğüçö]))/g, function(letter) {
        return letters[letter];
    });

    return string.toLowerCase();
};

String.prototype.turkishToUpperEnglishCharacter = function() {
    var string = this;
    var letters = { "İ": "I", "Ş": "S", "Ğ": "G", "Ü": "U", "Ö": "O", "Ç": "C",
        "ş": "S", "ğ": "G", "ü": "U", "ö": "O", "ç": "C", "ı": "I"};
    string = string.replace(/(([İŞĞÜÇÖışğüçö]))/g, function(letter) {
        return letters[letter];
    });

    return string.toUpperCase();
};