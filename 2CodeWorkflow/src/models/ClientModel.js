const dynamoose = require('../helpers/dynamoose');
const uuid = require('uuid/v4');
const DYNAMODB_THROUGHPUT = 5;

const ClientSchema = new dynamoose.Schema({
  id: {
    type: String,
    hashKey: true,
    required: true,
    default: () => uuid()
  },
  sso: {
    type: Boolean,
    default: false
  },
  origins: {
    type: 'list',
    list: [String],
    default: []
  },
  secret: {
    type: String
  }
}, {
  useDocumentTypes: true,
  throughput: DYNAMODB_THROUGHPUT
});

module.exports = dynamoose.model('clients', ClientSchema);
