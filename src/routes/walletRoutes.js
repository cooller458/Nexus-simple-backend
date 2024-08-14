import { Router } from 'express';
import { createWallet, getBalance, sendTransaction } from '../controllers/walletController.js';

const router = Router();

/**
 * @swagger
 * /api/wallet/create-wallet:
 *   get:
 *     summary: Cüzdan oluştur
 *     description: Yeni bir cüzdan oluşturur ve özel anahtar ile adresi döner.
 *     responses:
 *       200:
 *         description: Başarılı. Cüzdan bilgilerini döner.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 privateKey:
 *                   type: string
 *                 address:
 *                   type: string
 *       500:
 *         description: Sunucu hatası.
 */
router.get('/create-wallet', createWallet);

/**
 * @swagger
 * /api/wallet/balance/{address}:
 *   get:
 *     summary: Bakiye sorgulama
 *     description: Belirtilen adresin bakiyesini döner.
 *     parameters:
 *       - in: path
 *         name: address
 *         required: true
 *         description: Bakiye sorgulamak için adres.
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Başarılı. Adresin bakiyesini döner.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 balance:
 *                   type: string
 *       500:
 *         description: Sunucu hatası.
 */
router.get('/balance/:address', getBalance);

/**
 * @swagger
 * /api/wallet/send-transaction:
 *   post:
 *     summary: Transfer işlemi
 *     description: Verilen cüzdandan başka bir adrese kripto para transferi gerçekleştirir.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               privateKey:
 *                 type: string
 *                 description: Gönderen cüzdanın özel anahtarı.
 *               to:
 *                 type: string
 *                 description: Alıcı adres.
 *               amount:
 *                 type: string
 *                 description: Gönderilecek miktar (ETH cinsinden).
 *     responses:
 *       200:
 *         description: Başarılı. İşlem bilgilerini döner.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 transactionHash:
 *                   type: string
 *       500:
 *         description: Sunucu hatası.
 */
router.post('/send-transaction', sendTransaction);

export default router;