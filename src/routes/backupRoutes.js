import express from 'express';
import { createBackup, restoreBackup } from '../services/backupService.js';
import authMiddleware from '../middleware/authMiddleware.js';

const router = express.Router();

// @route   POST /api/backup
// @desc    Yedekleme oluştur
// @access  Private
router.post('/', authMiddleware, async (req, res) => {
  try {
    const backupFile = await createBackup();
    res.json({ msg: 'Yedekleme başarıyla oluşturuldu', backupFile });
  } catch (err) {
    res.status(500).send('Sunucu hatası');
  }
});

// @route   POST /api/backup/restore
// @desc    Yedekten kurtarma işlemi yap
// @access  Private
router.post('/restore', authMiddleware, async (req, res) => {
  const { backupFile } = req.body;
  try {
    await restoreBackup(backupFile);
    res.json({ msg: 'Kurtarma işlemi başarıyla tamamlandı' });
  } catch (err) {
    res.status(500).send('Sunucu hatası');
  }
});

export default router;