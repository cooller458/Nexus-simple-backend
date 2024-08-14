import path from 'path';
import { fileURLToPath } from 'url';
import { exec } from 'child_process';

// ESM'de __dirname ve __filename kullanımı
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const backupDirectory = path.join(__dirname, '../../backups');

// Yedekleme İşlemi
export const createBackup = async () => {
  try {
    if (!fs.existsSync(backupDirectory)) {
      fs.mkdirSync(backupDirectory, { recursive: true });
    }

    const backupFile = path.join(backupDirectory, `backup-${Date.now()}.tar.gz`);
    const command = `tar -czf ${backupFile} --exclude='./node_modules' --exclude='./backups' ./`;

    exec(command, (err, stdout, stderr) => {
      if (err) {
        console.error('Yedekleme hatası:', err);
        throw err;
      }
      console.log('Yedekleme başarıyla oluşturuldu:', backupFile);
    });

    return backupFile;
  } catch (err) {
    console.error('Yedekleme oluşturma hatası:', err);
    throw err;
  }
};

// Yedekten Kurtarma İşlemi
export const restoreBackup = async (backupFile) => {
  try {
    const command = `tar -xzf ${backupFile} -C ./`;

    exec(command, (err, stdout, stderr) => {
      if (err) {
        console.error('Kurtarma hatası:', err);
        throw err;
      }
      console.log('Kurtarma işlemi başarıyla tamamlandı:', backupFile);
    });
  } catch (err) {
    console.error('Kurtarma işlemi hatası:', err);
    throw err;
  }
};