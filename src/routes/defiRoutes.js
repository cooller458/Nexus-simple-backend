import express from 'express';
import { stakeTokens, unstakeTokens, claimRewards, provideLiquidity, removeLiquidity, automaticInvestment } from '../services/defiService.js';
import authMiddleware from '../middleware/authMiddleware.js';

const router = express.Router();

// @route   POST /api/defi/stake
// @desc    Staking işlemi yap
// @access  Private
router.post('/stake', authMiddleware, async (req, res) => {
  const { privateKey, stakingContractAddress, amount, network } = req.body;
  try {
    const tx = await stakeTokens(privateKey, stakingContractAddress, amount, network);
    res.json(tx);
  } catch (err) {
    res.status(500).send('Sunucu hatası');
  }
});

// @route   POST /api/defi/unstake
// @desc    Unstaking işlemi yap
// @access  Private
router.post('/unstake', authMiddleware, async (req, res) => {
  const { privateKey, stakingContractAddress, amount, network } = req.body;
  try {
    const tx = await unstakeTokens(privateKey, stakingContractAddress, amount, network);
    res.json(tx);
  } catch (err) {
    res.status(500).send('Sunucu hatası');
  }
});

// @route   POST /api/defi/claim-rewards
// @desc    Stake ödüllerini topla
// @access  Private
router.post('/claim-rewards', authMiddleware, async (req, res) => {
  const { privateKey, stakingContractAddress, network } = req.body;
  try {
    const tx = await claimRewards(privateKey, stakingContractAddress, network);
    res.json(tx);
  } catch (err) {
    res.status(500).send('Sunucu hatası');
  }
});

// @route   POST /api/defi/provide-liquidity
// @desc    Likidite sağla
// @access  Private
router.post('/provide-liquidity', authMiddleware, async (req, res) => {
  const { privateKey, liquidityPoolAddress, tokenA, tokenB, amountA, amountB, network } = req.body;
  try {
    const tx = await provideLiquidity(privateKey, liquidityPoolAddress, tokenA, tokenB, amountA, amountB, network);
    res.json(tx);
  } catch (err) {
    res.status(500).send('Sunucu hatası');
  }
});

// @route   POST /api/defi/remove-liquidity
// @desc    Likiditeyi geri çek
// @access  Private
router.post('/remove-liquidity', authMiddleware, async (req, res) => {
  const { privateKey, liquidityPoolAddress, tokenA, tokenB, liquidity, network } = req.body;
  try {
    const tx = await removeLiquidity(privateKey, liquidityPoolAddress, tokenA, tokenB, liquidity, network);
    res.json(tx);
  } catch (err) {
    res.status(500).send('Sunucu hatası');
  }
});

// @route   POST /api/defi/automatic-investment
// @desc    Otomatik yatırım işlemleri gerçekleştir
// @access  Private
router.post('/automatic-investment', authMiddleware, async (req, res) => {
  const { privateKey, strategies, network } = req.body;
  try {
    const result = await automaticInvestment(privateKey, strategies, network);
    res.json(result);
  } catch (err) {
    res.status(500).send('Sunucu hatası');
  }
});

export default router;