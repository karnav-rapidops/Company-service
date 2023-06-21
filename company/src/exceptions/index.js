const validationError = require('./validation.error');
const objectNotFound = require('./object-not-found.error');
const forbiddenError = require('./forbidden.error');
const databaseError = require('./database.error')

module.exports = {
  validationError,
  objectNotFound,
  forbiddenError,
  databaseError,
};
