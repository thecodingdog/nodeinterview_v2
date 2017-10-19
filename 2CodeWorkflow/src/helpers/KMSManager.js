const AWS = require('aws-sdk');
const config = require('config');
const kms = new AWS.KMS();
const JWT_KEY = config.get('KMS.JWT_KEY');

class KMSManager {
  static get jwtSecret() {
    return this._jwtSecret;
  }

  static async prepareSecrets() {
    this._decrypt(JWT_KEY).then(secret => {
      this._jwtSecret = secret;
    });
  }

  static _decrypt(key) {
    return new Promise((resolve, reject) =>
      kms.decrypt({CiphertextBlob: Buffer.from(key, 'base64')}, (err, result) => {
        if (err)
          return reject(err);
        resolve(result.Plaintext.toString());
      }));
  }
}

module.exports = KMSManager;
