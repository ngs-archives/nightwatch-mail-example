const testMailDomain = process.env.MAIL_DOMAIN;
const requestbin = require('requestbin');
const Mandrill = require('mandrill-api').Mandrill;
const mandrill = new Mandrill(process.env.MANDRILL_API_KEY);

module.exports = {
  mandrill,
  requestbin,
  waitForConditionTimeout: 60000,
  requestbinHost: 'http://requestb.in',
  email: process.env.EMAIL || 'nightwatch-' + (new Date().getTime().toString(16)) + '@' + testMailDomain
};
