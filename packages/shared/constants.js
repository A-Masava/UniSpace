/**
 * Shared Constants
 */

const ROLES = {
  ADMIN: 'admin',
  TEACHER: 'teacher',
  STUDENT: 'student'
};

const HTTP_STATUS = {
  OK: 200,
  CREATED: 201,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  SERVER_ERROR: 500
};

const MESSAGES = {
  SUCCESS: 'Operation successful',
  ERROR: 'Operation failed',
  UNAUTHORIZED: 'Unauthorized access',
  NOT_FOUND: 'Resource not found'
};

module.exports = {
  ROLES,
  HTTP_STATUS,
  MESSAGES
};
