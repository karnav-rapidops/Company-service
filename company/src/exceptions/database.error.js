class DatabaseError extends Error {
    constructor(...params) {
      super(...params);
  
      if (Error.captureStackTrace) {
        Error.captureStackTrace(this, DatabaseError);
      }
  
      this.name = 'DatabaseError';
      this.httpStatusCode=502;
    }
  }
  module.exports = DatabaseError;
  