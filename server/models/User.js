const mockDb = require('../utils/mockDb');

// User schema definition kept for documentation purposes
/*
const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['volunteer', 'admin'], default: 'volunteer' },
  createdAt: { type: Date, default: Date.now },
});
*/

module.exports = mockDb.User;
