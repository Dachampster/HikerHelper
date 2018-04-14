//++++++++++++++++++++
//+ SACSConfig.js    +
//++++++++++++++++++++
var crypto = require('crypto'),
  algorithm = 'aes-256-ctr',
  password = 'abcdbzzzzakuku';

module.exports = {
  "environment": "https://api.test.sabre.com",
  "userId": "VjE6MzFoM242aGt3cXZsOWV4azpERVZDRU5URVI6RVhU",
  "group": "",
  "domain": "",
  "clientSecret": "azdMZFY0S2U=",
  "formatVersion": "V1",

  encrypt: function (text) {
    var cipher = crypto.createCipher(algorithm, password);
    var crypted = cipher.update(text, 'utf8', 'hex');
    crypted += cipher.final('hex');
    console.log(crypted);
    return crypted;
  },
  decrypt: function (text) {
    var decipher = crypto.createDecipher(algorithm, password);
    var dec = decipher.update(text, 'hex', 'utf8');
    dec += decipher.final('utf8');
    return dec;
  }

}