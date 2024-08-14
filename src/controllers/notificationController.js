import Notification from '../models/Notification.js';

// Bildirimleri Getir
export const getNotifications = async (req, res) => {
  try {
    const notifications = await Notification.find({ user: req.user.id }).sort({ createdAt: -1 });
    res.json(notifications);
  } catch (err) {
    console.error('Bildirimleri getirme hatası:', err);
    res.status(500).send('Sunucu hatası');
  }
};

// Yeni Bildirim Ekle
export const addNotification = async (req, res) => {
  const { type, message } = req.body;
  try {
    const notification = new Notification({
      user: req.user.id,
      type,
      message,
    });
    await notification.save();
    res.json(notification);
  } catch (err) {
    console.error('Bildirim ekleme hatası:', err);
    res.status(500).send('Sunucu hatası');
  }
};

// Bildirimleri Okundu Olarak İşaretle
export const markAsRead = async (req, res) => {
  try {
    await Notification.updateMany({ user: req.user.id, isRead: false }, { isRead: true });
    res.json({ msg: 'Tüm bildirimler okundu olarak işaretlendi' });
  } catch (err) {
    console.error('Bildirimleri okundu olarak işaretleme hatası:', err);
    res.status(500).send('Sunucu hatası');
  }
};