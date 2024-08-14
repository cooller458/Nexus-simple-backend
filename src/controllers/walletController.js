import * as blockchainService from '../services/blockchainService.js';

export const createWallet = async (req, res) => {
  try {
    const wallet = blockchainService.createWallet();
    res.json(wallet);
  } catch (err) {
    res.status(500).json({ error: 'Cüzdan oluşturulamadı' });
  }
};

export const getBalance = async (req, res) => {
  const { address } = req.params;
  try {
    const balance = await blockchainService.getBalance(address);
    res.json({ balance });
  } catch (err) {
    res.status(500).json({ error: 'Bakiye sorgulanamadı' });
  }
};

export const sendTransaction = async (req, res) => {
  const { privateKey, to, amount } = req.body;
  try {
    const transaction = await blockchainService.sendTransaction(privateKey, to, amount);
    res.json(transaction);
  } catch (err) {
    res.status(500).json({ error: 'Transfer işlemi gerçekleştirilemedi' });
  }
};