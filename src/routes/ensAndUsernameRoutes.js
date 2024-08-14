import express from 'express';
import { resolveENSName, checkENSNameAvailability } from '../services/ensService.js';
import { transferWithUsername } from '../services/usernameTransferService.js';
import authMiddleware from '../middleware/authMiddleware.js';

const router = express.Router();

// @route   GET /api/ens/resolve/:ensName
// @desc    ENS adını çözümlenir
// @access  Public
router.get('/resolve/:ensName', async (req, res) => {
  const { ensName } = req.params;
  const { network } = req.query;
  try {
    const address = await resolveENSName(ensName, network);
    res.json({ address });
  } catch (err) {
    res.status(500).send('Sunucu hatası');
  }
});

// @route   GET /api/ens/check/:ensName
// @desc    ENS adı kullanılabilir mi kontrol edilir
// @access  Public
router.get('/check/:ensName', async (req, res) => {
  const { ensName } = req.params;
  const { network } = req.query;
  try {
    const available = await checkENSNameAvailability(ensName, network);
    res.json({ available });
  } catch (err) {
    res.status(500).send('Sunucu hatası');
  }
});

// @route   POST /api/username/transfer
// @desc    Kullanıcı adı ile transfer yap
// @access  Private
router.post('/transfer', authMiddleware, async (req, res) => {
  const { privateKey, username, amount, network, ens } = req.body;
  try {
    const tx = await transferWithUsername(privateKey, username, amount, network, ens);
    res.json(tx);
  } catch (err) {
    res.status(500).send('Sunucu hatası');
  }
});

export default router;