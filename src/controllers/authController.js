import User from '../models/User.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export const register = async (req, res) => {
  const { username, email, password } = req.body;
  try {
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ msg: 'Kullanıcı zaten kayıtlı' });
    }

    user = new User({
      username,
      email,
      password,
    });

    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);

    await user.save();

    const payload = {
      user: {
        id: user.id,
      },
    };

    jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' }, (err, token) => {
      if (err) throw err;
      res.json({ token });
    });
  } catch (err) {
    console.error('Register hatası:', err);
    res.status(500).send('Sunucu Hatası');
  }

};

// Kullanıcı Girişi
export async function login(req, res) {
    const { email, password } = req.body;
    try {
      const user = await findOne({ email });
      if (!user) {
        return res.status(400).json({ msg: 'Geçersiz kimlik bilgileri' });
      }
  
      const isMatch = await compare(password, user.password);
      if (!isMatch) {
        return res.status(400).json({ msg: 'Geçersiz kimlik bilgileri' });
      }
  
      const payload = {
        user: {
          id: user.id,
        },
      };
  
      sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' }, (err, token) => {
        if (err) throw err;
        res.json({ token });
      });
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Sunucu Hatası');
    }
};