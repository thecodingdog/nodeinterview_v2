const dynamoose = require('dynamoose');
const config = require('config');
const DYNAMODB_TABLE_PREFIX = config.get('DYNAMODB_TABLE_PREFIX');
const AWS = require('aws-sdk');
const https = require('https');
const agent = new https.Agent({
  keepAlive: true
});

AWS.config.update({
  httpOptions: {agent}
});

dynamoose.AWS = AWS;

dynamoose.setDefaults({
  create: true,
  update: process.env.NODE_ENV != 'production',
  waitForActive: false,
  waitForActiveTimeout: 3600000,
  prefix: `${DYNAMODB_TABLE_PREFIX}-`
});

module.exports = dynamoose;
