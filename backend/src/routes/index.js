const express = require('express');
const authRoutes = require('./authRoutes');
const userRoutes = require('./userRoutes');
const transactionRoutes = require('./transactionRoutes');
const dashboardRoutes = require('./dashboardRoutes');

const router = express.Router();

router.get('/health', (req, res) => {
  res.status(200).json({ success: true, message: 'API is healthy', data: { uptime: process.uptime() } });
});

router.use('/auth', authRoutes);
router.use('/users', userRoutes);
router.use('/transactions', transactionRoutes);
router.use('/dashboard', dashboardRoutes);

module.exports = router;
