// createAdmin.js
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const bcrypt = require('bcryptjs');
const Admin = require('./models/Admin');
const connectDB = require('./config/db');

dotenv.config();
connectDB();

const createDefaultAdmin = async () => {
  try {
    const existing = await Admin.findOne({ username: 'admin' });
    if (existing) {
      console.log('🚨 Admin already exists.');
      process.exit(0);
    }

    const hashedPassword = await bcrypt.hash('admin123', 10);

    const newAdmin = new Admin({
      username: 'admin',
      password: hashedPassword
    });

    await newAdmin.save();
    console.log('✅ Default admin created:');
    console.log('   Username: admin');
    console.log('   Password: admin123');
    process.exit(0);
  } catch (err) {
    console.error('❌ Error creating admin:', err.message);
    process.exit(1);
  }
};

createDefaultAdmin();
