import User from '../models/User.js';

// Kullanıcı Profili Getir
export const getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    res.json(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Sunucu hatası');
  }
};

// Kullanıcı Profili Güncelle
export const updateProfile = async (req, res) => {
  const { username, email } = req.body;
  try {
    const user = await User.findById(req.user.id);
    if (user) {
      user.username = username || user.username;
      user.email = email || user.email;
      await user.save();
      res.json(user);
    } else {
      res.status(404).json({ msg: 'Kullanıcı bulunamadı' });
    }
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Sunucu hatası');
  }
};