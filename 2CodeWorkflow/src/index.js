const config = require('config');
const CLUSTER_ENABLED = config.get('CLUSTER_ENABLED');
const logger = require('./helpers/logger');
const cluster = require('cluster');

if (CLUSTER_ENABLED && cluster.isMaster) {
  const numCPUs = require('os').cpus().length;

  logger.startRotating();
  logger.info(`Master ${process.pid} is running. Starting ${numCPUs} forks`);

  for (let i = 0; i < numCPUs; i++) {
    cluster.fork();
  }

  cluster.on('exit', (worker, code, signal) => {
    logger.info(`Worker ${worker.process.pid} died`, {code, signal});
    logger.info('Starting a new worker');
    cluster.fork();
  });

  cluster.on('error', (err) => logger.error('Error in child', {err}));
} else {
  process.on('uncaughtException', err => logger.error(`process.uncaughtException`, {pid: process.pid, err}));

  if (CLUSTER_ENABLED) {
    logger.info(`Worker ${process.pid} started`);
  }
  const App = require('./App');
  App.start();
}
