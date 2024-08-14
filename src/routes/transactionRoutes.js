import express from 'express';
import { sendTransaction, getTransactionStatus } from '../controllers/transactionController.js';
import authMiddleware from '../middleware/authMiddleware.js';

const router = express.Router();

// @route   POST /api/transaction/send
// @desc    Kripto varlık transferi yap
// @access  Private
router.post('/send', authMiddleware, sendTransaction);

// @route   GET /api/transaction/status/:txHash/:network
// @desc    İşlem durumunu takip et
// @access  Private
router.get('/status/:txHash/:network', authMiddleware, getTransactionStatus);

export default router;