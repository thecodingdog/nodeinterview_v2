const {RESPONSE_MESSAGES} = require('../const');

module.exports = async (ctx, next) => {
  ctx._sendResponse = (status, body) => {
    ctx.status = status;
    if (body) {
      ctx.body = body;
    }
  };

  const {log, _sendResponse} = ctx;

  ctx.ok = data => {
    log.debug('ctx.ok', data || {});

    _sendResponse(200, data);
  };

  ctx.notAuthorized = (data = RESPONSE_MESSAGES.EXCEPTION) => {
    log.debug('ctx.notAuthorized', data);

    _sendResponse(401, data);
  };

  ctx.badRequest = (data = RESPONSE_MESSAGES.INVALID_INPUT) => {
    log.debug('ctx.badRequest', data);

    _sendResponse(400, data);
  };

  ctx.forbidden = (data = RESPONSE_MESSAGES.EXCEPTION) => {
    log.debug('ctx.forbidden', data);

    _sendResponse(403, data);
  };

  ctx.notFound = (data = RESPONSE_MESSAGES.EXCEPTION) => {
    log.debug('ctx.notFound', data);

    _sendResponse(404, data);
  };

  ctx.serverError = err => {
    log.error('ctx.serverError', {err});

    _sendResponse(500, RESPONSE_MESSAGES.EXCEPTION);
  };

  ctx.noContent = () => {
    log.debug('ctx.noContent');

    _sendResponse(204);
  };


  await next();
};
