const AWS = require('aws-sdk');
const https = require('https');
const agent = new https.Agent({
  keepAlive: true
});

AWS.config.update({
  httpOptions: {agent}
});

module.exports = AWS;
