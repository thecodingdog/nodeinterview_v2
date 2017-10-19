const Router = require('koa-router');
const {ROUTER_PREFIX} = require('./const');
const router = new Router({
  prefix: ROUTER_PREFIX
});
const ClientController = require('./controllers/ClientController');
const UtilController = require('./controllers/UtilController');
const Validation = require('./middleware/Validation');

module.exports = router
  .get('internal/clients', ClientController.list)
  .get(
    'clients/by-origin',
    Validation.validateGetByOriginInput,
    ClientController.getByOrigin
  )
  .get(
    'internal/api-key/validation',
    Validation.validateApiKey
  )
  .get('internal/clients/:clientId', ClientController.getById)
  .get('health', UtilController.healthCheck);
