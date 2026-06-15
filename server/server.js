const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const errorHandler = require('./middleware/errorHandler');

// Load env vars
dotenv.config();

// Route imports
const authRoutes = require('./routes/authRoutes');
const volunteerRoutes = require('./routes/volunteerRoutes');
const adminRoutes = require('./routes/adminRoutes');
const reportRoutes = require('./routes/reportRoutes');

const app = express();

// CORS
const allowedOrigins = process.env.CLIENT_URL
  ? process.env.CLIENT_URL.split(',').map(o => o.trim())
  : [];

// Add default local origins
allowedOrigins.push('http://localhost:5173', 'http://localhost:5174');

app.use(cors({
  origin: function (origin, callback) {
    // Allow requests with no origin (like mobile apps, postman, curl)
    if (!origin) return callback(null, true);

    const isLocalhost = origin.includes('localhost') || origin.includes('127.0.0.1');
    const isVercel = origin.endsWith('.vercel.app');
    const isExplicitlyAllowed = allowedOrigins.some(allowed => {
      if (allowed === '*') return true;
      return allowed.toLowerCase() === origin.toLowerCase();
    });

    if (isExplicitlyAllowed || isLocalhost || isVercel) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));

// Body parser
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

// Health check
app.get('/api/health', (req, res) => {
  res.json({ success: true, message: 'NayePankh Volunteer API is running' });
});

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/volunteers', volunteerRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/reports', reportRoutes);

// 404 handler
app.use((req, res) => {
  res.status(404).json({ success: false, message: 'Route not found' });
});

// Error handler
app.use(errorHandler);

// Connect to DB and start server
const PORT = process.env.PORT || 5000;

const startServer = async () => {
  await connectDB();

  // Seed admin user
  try {
    const User = require('./models/User');
    const existingAdmin = await User.findOne({ email: 'admin@nayepankh.org' });
    if (!existingAdmin) {
      await User.create({
        name: 'Admin',
        email: 'admin@nayepankh.org',
        password: 'Admin@123',
        role: 'admin',
      });
      console.log('✅ Admin user seeded: admin@nayepankh.org / Admin@123');
    }
  } catch (err) {
    console.log('Admin seed skipped (may already exist)');
  }

  app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
    console.log(`📍 API: http://localhost:${PORT}/api`);
    console.log(`🌐 Client: ${process.env.CLIENT_URL || 'http://localhost:5173'}`);
  });
};

startServer();
