import express from 'express';
import { getNotifications, addNotification, markAsRead } from '../controllers/notificationController.js';
import authMiddleware from '../middleware/authMiddleware.js';

const router = express.Router();

// @route   GET /api/notifications
// @desc    Kullanıcı bildirimlerini getir
// @access  Private
router.get('/', authMiddleware, getNotifications);

// @route   POST /api/notifications
// @desc    Yeni bildirim ekle
// @access  Private
router.post('/', authMiddleware, addNotification);

// @route   PUT /api/notifications/read
// @desc    Tüm bildirimleri okundu olarak işaretle
// @access  Private
router.put('/read', authMiddleware, markAsRead);

export default router;