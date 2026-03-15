/**
 * Shared Roles
 */

const ROLES = {
  ADMIN: 'admin',
  TEACHER: 'teacher',
  STUDENT: 'student'
};

const ROLE_PERMISSIONS = {
  admin: ['read_all', 'write_all', 'delete_all'],
  teacher: ['create_class', 'manage_class', 'upload_resources'],
  student: ['join_class', 'view_resources', 'send_messages']
};

module.exports = {
  ROLES,
  ROLE_PERMISSIONS
};
