const testMailDomain = process.env.MAIL_DOMAIN;
const requestbin = require('requestbin');
const Mandrill = require('mandrill-api').Mandrill;
const mandrill = new Mandrill(process.env.MANDRILL_API_KEY);
const requestbinHost = process.env.REQUEST_BIN_HOST || 'http://requestb.in'

requestbin.config({
  apiBase: `${requestbinHost}/api/v1/`
});

module.exports = {
  mandrill,
  requestbin,
  waitForConditionTimeout: 60000,
  requestbinHost: requestbinHost,
  email: process.env.EMAIL || 'nightwatch-' + (new Date().getTime().toString(16)) + '@' + testMailDomain
};
