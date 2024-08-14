import express from 'express';
import { getPortfolio, updatePortfolio } from '../controllers/portfolioController.js';
import authMiddleware from '../middleware/authMiddleware.js';

const router = express.Router();

// @route   GET /api/portfolio
// @desc    Kullanıcı portföyünü getir
// @access  Private
router.get('/', authMiddleware, getPortfolio);

// @route   PUT /api/portfolio
// @desc    Kullanıcı portföyünü güncelle
// @access  Private
router.put('/', authMiddleware, updatePortfolio);

export default router;