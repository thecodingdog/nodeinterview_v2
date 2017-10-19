const logger = require('../helpers/logger');

module.exports = async (ctx, next) => {
  ctx.log = logger.createAsContext({
    requestId: ctx.get('x-aa-request-id')
  });

  await next();
};
