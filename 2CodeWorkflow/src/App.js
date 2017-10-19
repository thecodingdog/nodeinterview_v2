const logger = require('./helpers/logger');
const Koa = require('koa');
const app = new Koa();
const config = require('config');
const PORT = config.get('PORT');
const cors = require('kcors');
const helmet = require('koa-helmet');
const router = require('./router');
const loggerExtension = require('./middleware/loggerExtension');
const logRequest = require('./middleware/logRequest');
const serverErrorHandler = require('./middleware/serverErrorHandler');
const responseExtension = require('./middleware/responseExtension');
const bodyParser = require('./middleware/bodyParser');
const KMSManager = require('./helpers/KMSManager');

class App {
  static start() {
    app.use(helmet());
    app.use(helmet.noCache());
    app.use(loggerExtension);
    app.use(cors());
    app.use(responseExtension);
    app.use(serverErrorHandler);
    app.use(bodyParser);
    app.use(logRequest);
    app.use(router.routes());

    KMSManager.prepareSecrets()
      .then(() => app.listen(PORT, () => logger.info(`Server running on port ${PORT}.`)))
      .catch(err => logger.error('Startup error', {err}));
  }
}

module.exports = App;
