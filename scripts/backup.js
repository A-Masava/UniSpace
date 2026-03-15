/**
 * Database Backup Script
 */

const fs = require('fs');
const path = require('path');
const { exec } = require('child_process');

const backupDir = path.join(__dirname, '../backups');

// Ensure backup directory exists
if (!fs.existsSync(backupDir)) {
  fs.mkdirSync(backupDir, { recursive: true });
}

const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
const backupFileName = `unispace_backup_${timestamp}.js`;
const backupPath = path.join(backupDir, backupFileName);

const backupCommand = `mongodump --db unispace --archive=${backupPath}`;

exec(backupCommand, (error, stdout, stderr) => {
  if (error) {
    console.error('Backup failed:', error);
    process.exit(1);
  }
  console.log('Database backed up successfully to:', backupPath);
  console.log(stdout);
});
