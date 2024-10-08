import express, { json } from 'express';
import connectDB from './config/db.js';
import cors from 'cors';
import authRoutes from './routes/authRoutes.js';
import walletRoutes from './routes/walletRoutes.js';
import profileRoutes from './routes/profileRoutes.js';
import notificationRoutes from './routes/notificationRoutes.js';
import portfolioRoutes from './routes/portfolioRoutes.js';
import transactionRoutes from './routes/transactionRoutes.js';
import backupRoutes from './routes/backupRoutes.js';
import defiRoutes from './routes/defiRoutes.js';
import accountAbstractionRoutes from './routes/accountAbstractionRoutes.js';
import ensAndUsernameRoutes from './routes/ensAndUsernameRoutes.js';

import dotenv from 'dotenv';

dotenv.config();

// Veritabanı Bağlantısı
connectDB();

const app = express();

// Middleware
app.use(cors());
app.use(json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/wallet', walletRoutes);
app.use('/api/profile', profileRoutes);
app.use('/api/notifications', notificationRoutes);
app.use('/api/portfolio', portfolioRoutes);
app.use('/api/transaction', transactionRoutes);
app.use('/api/backup', backupRoutes);
app.use('/api/defi', defiRoutes);
app.use('/api/account-abstraction', accountAbstractionRoutes);
app.use('/api/ens', ensAndUsernameRoutes);
app.use('/api/username', ensAndUsernameRoutes);

const PORT = process.env.PORT || 5174;

app.listen(PORT, () => {
  console.log(`Sunucu ${PORT} numaralı portta çalışıyor`);
});