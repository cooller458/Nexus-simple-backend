import express from 'express';
import { approveTransaction, sponsorTransaction, executeDynamicTransaction } from '../services/accountAbstraction.js';
import authMiddleware from '../middleware/authMiddleware.js';

const router = express.Router();

// @route   POST /api/account-abstraction/approve
// @desc    İşlem onayı yap
// @access  Private
router.post('/approve', authMiddleware, async (req, res) => {
  const { privateKey, contractAddress, spender, amount, network } = req.body;
  try {
    const tx = await approveTransaction(privateKey, contractAddress, spender, amount, network);
    res.json(tx);
  } catch (err) {
    res.status(500).send('Sunucu hatası');
  }
});

// @route   POST /api/account-abstraction/sponsor
// @desc    Sponsorlu işlem yap
// @access  Private
router.post('/sponsor', authMiddleware, async (req, res) => {
  const { privateKey, userAddress, transactionData, sponsorAddress, network } = req.body;
  try {
    const tx = await sponsorTransaction(privateKey, userAddress, transactionData, sponsorAddress, network);
    res.json(tx);
  } catch (err) {
    res.status(500).send('Sunucu hatası');
  }
});

// @route   POST /api/account-abstraction/dynamic
// @desc    Dinamik işlem gerçekleştir
// @access  Private
router.post('/dynamic', authMiddleware, async (req, res) => {
  const { privateKey, contractAddress, methodName, params, network } = req.body;
  try {
    const tx = await executeDynamicTransaction(privateKey, contractAddress, methodName, params, network);
    res.json(tx);
  } catch (err) {
    res.status(500).send('Sunucu hatası');
  }
});

export default router;