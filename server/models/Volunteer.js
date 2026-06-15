const mockDb = require('../utils/mockDb');

// Volunteer schema definition kept for documentation purposes
/*
const volunteerSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  fullName: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  city: { type: String, required: true },
  state: { type: String, required: true },
  college: { type: String, required: true },
  degree: { type: String, required: true },
  yearOfStudy: { type: String, required: true },
  skills: { type: [String], required: true },
  areasOfInterest: { type: [String], required: true },
  motivation: { type: String, required: true },
  availableHours: { type: String, required: true },
  linkedinUrl: { type: String, default: '' },
  githubUrl: { type: String, default: '' },
  status: { type: String, enum: ['pending', 'approved', 'rejected'], default: 'pending' },
  adminNote: { type: String, default: '' },
  statusHistory: [...],
  registeredAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});
*/

module.exports = mockDb.Volunteer;
