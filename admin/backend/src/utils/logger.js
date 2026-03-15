/**
 * Logger Utility
 */

const fs = require('fs');
const path = require('path');

const logDir = path.join(__dirname, '../../logs');
if (!fs.existsSync(logDir)) {
  fs.mkdirSync(logDir);
}

const log = (level, message, data = {}) => {
  const timestamp = new Date().toISOString();
  const logMessage = `[${timestamp}] [${level}] ${message} ${JSON.stringify(data)}`;
  console.log(logMessage);
};

module.exports = {
  info: (message, data) => log('INFO', message, data),
  error: (message, data) => log('ERROR', message, data),
  warn: (message, data) => log('WARN', message, data),
  debug: (message, data) => log('DEBUG', message, data)
};
