import Portfolio from '../models/Portfolio.js';

// Kullanıcı Portföyünü Getir
export const getPortfolio = async (req, res) => {
  try {
    const portfolio = await Portfolio.findOne({ user: req.user.id });
    if (!portfolio) {
      return res.status(404).json({ msg: 'Portföy bulunamadı' });
    }
    res.json(portfolio);
  } catch (err) {
    console.error('Portföy getirme hatası:', err);
    res.status(500).send('Sunucu hatası');
  }
};

// Portföy Güncelle
export const updatePortfolio = async (req, res) => {
  const { assets } = req.body;
  try {
    let portfolio = await Portfolio.findOne({ user: req.user.id });
    if (!portfolio) {
      portfolio = new Portfolio({ user: req.user.id, assets });
    } else {
      portfolio.assets = assets;
      portfolio.updatedAt = Date.now();
    }
    await portfolio.save();
    res.json(portfolio);
  } catch (err) {
    console.error('Portföy güncelleme hatası:', err);
    res.status(500).send('Sunucu hatası');
  }
};