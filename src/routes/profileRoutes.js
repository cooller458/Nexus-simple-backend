import express from 'express';
import { getProfile, updateProfile } from '../controllers/profileController.js';
import authMiddleware from '../middleware/authMiddleware.js';

const router = express.Router();

// @route   GET /api/profile
// @desc    Kullanıcı profilini getir
// @access  Private
router.get('/', authMiddleware, getProfile);

// @route   PUT /api/profile
// @desc    Kullanıcı profilini güncelle
// @access  Private
router.put('/', authMiddleware, updateProfile);

export default router;