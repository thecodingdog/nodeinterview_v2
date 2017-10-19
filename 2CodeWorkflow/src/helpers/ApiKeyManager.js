const jwt = require('jsonwebtoken');
const KMSManager = require('./KMSManager');
const config = require('config');
const API_KEY_MAX_AGE = config.get('API_KEY_MAX_AGE') / 1000;

class ApiKeyManager {
  static create(clientId, origin) {
    const key = {
      clientId,
      origin
    };

    return jwt.sign(
      key,
      KMSManager.jwtSecret,
      {expiresIn: API_KEY_MAX_AGE}
    );
  }

  static isValid(key, clientId, origin) {
    try {
      const data = jwt.verify(key, KMSManager.jwtSecret);
      return data.clientId === clientId && origin === data.origin;
    } catch (error) {
      return false;
    }
  }
}

module.exports = ApiKeyManager;
