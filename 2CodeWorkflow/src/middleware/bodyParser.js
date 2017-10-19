const bodyParser = require('koa-bodyparser');
const {BadRequest} = require('../helpers/customError');

module.exports = bodyParser({
  onerror: () => {
    throw new BadRequest();
  }
});
