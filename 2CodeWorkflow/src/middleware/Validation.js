const {RESPONSE_MESSAGES} = require('../const');
const ApiKey = require('../helpers/ApiKeyManager');

class Validation {
  static async validateGetByOriginInput(ctx, next) {
    const {log, headers, badRequest} = ctx;

    log.debug('Validation.validateGetByOriginInput');

    if (!headers.origin)
      return badRequest(RESPONSE_MESSAGES.INVALID_ORIGIN);

    await next();
  }

  static validateApiKey(ctx) {
    const {query, log, forbidden, noContent} = ctx;
    const {key, clientId, origin} = query;

    log.debug('Validation.validateApiKey', {key, clientId, origin});

    return !ApiKey.isValid(key, clientId, origin)
      ? forbidden(RESPONSE_MESSAGES.INVALID_API_KEY)
      : noContent();
  }
}

module.exports = Validation;
