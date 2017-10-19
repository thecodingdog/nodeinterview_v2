const Logger = require('aa-logger');
const config = require('config');
const LOGGING = config.get('LOGGING');

module.exports = new Logger({
  filePath: LOGGING.PATH,
  level: LOGGING.LEVEL,
  maxFileSize: LOGGING.MAX_FILE_SIZE,
  maxHistorySize: LOGGING.MAX_HISTORY_SIZE
});
