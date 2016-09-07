const util = require('nightwatch/lib/util/utils');

exports.assertion = function receivedEmailSubjectEquals(addresss, expected, msg) {
  const DEFAULT_MSG = 'Testing if <%s> received with subject equals to "%s".';
  this.message = msg || util.format(DEFAULT_MSG, addresss, expected);

  this.expected = function() {
    return expected;
  };

  this.pass = function(value) {
    const expected = this.expected();
    return value.filter(function(email) {
      return email.subject === expected;
    }).length > 0;
  };

  this.value = function(result) {
    return result || [];
  };

  this.command = function(callback) {
    return this.api.checkEmails(addresss, callback);
  };

}
