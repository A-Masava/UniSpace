/**
 * Admin Configuration
 * Environment and app configuration
 */

export const adminConfig = {
  apiUrl: process.env.ADMIN_API_URL || 'http://localhost:5001',
  socketUrl: process.env.SOCKET_URL || 'http://localhost:5001',
};
