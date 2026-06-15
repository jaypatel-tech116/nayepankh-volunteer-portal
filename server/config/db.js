const mockDb = require('../utils/mockDb');

const connectDB = async () => {
  try {
    console.log('ℹ️ Server Offline Mock Mode: Initializing JSON database...');
    // Seed default admin account in the mock database
    await mockDb.seedAdmin();
    console.log('✅ Mock Database Initialized: d:\\VS CODE\\NAYEPANKH FOUNDATION\\nayepankh-volunteer-system\\server\\data.json');
  } catch (error) {
    console.error(`❌ Mock database initialization failed: ${error.message}`);
    process.exit(1);
  }
};

module.exports = connectDB;
