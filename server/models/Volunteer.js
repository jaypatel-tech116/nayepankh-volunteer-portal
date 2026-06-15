const mongoose = require('mongoose');

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
  statusHistory: [
    {
      status: { type: String, enum: ['pending', 'approved', 'rejected'] },
      note: { type: String, default: '' },
      changedAt: { type: Date, default: Date.now },
      changedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
    }
  ],
  registeredAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Volunteer', volunteerSchema);
