import { Router } from 'express';
import { register, login } from '../controllers/authController.js';

const router = Router();

// @route   POST /api/auth/register
// @desc    Kullanıcı kaydı
// @access  Public
router.post('/register', register);

// @route   POST /api/auth/login
// @desc    Kullanıcı girişi
// @access  Public
router.post('/login', login);

export default router;