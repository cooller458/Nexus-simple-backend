# NexuS Mobile Wallet Backend

NexuS, kullanıcıların kripto varlıklarını güvenli bir şekilde yönetmelerine olanak tanıyan bir mobil cüzdan uygulamasıdır. Bu proje, NexuS mobil cüzdan uygulamasının backend kısmını içerir.

## Özellikler

- Kullanıcı kaydı ve kimlik doğrulama
- Bildirimler ve uyarılar sistemi
- Varlık yönetimi ve piyasa verileri
- Blockchain etkileşimi ve işlem yönetimi
- Yedekleme ve kurtarma sistemi
- DeFi ve otomatik yatırım

## Kurulum

### Gereksinimler

- Node.js
- MongoDB
- Infura API Anahtarı (Ethereum işlemleri için)

### Adımlar

1. Bu projeyi klonlayın:
   ```bash
   git clone https://github.com/kullanici/nexus-backend.git
   cd nexus-backend

2. Gerekli bağımlılıkları yükleyin:
   ```bash
   npm install

3.	.env dosyasını oluşturun ve aşağıdaki gibi yapılandırın:
    ```bash
    PORT=5000
    MONGODB_URI=mongodb://localhost:27017/nexus
    JWT_SECRET=your_jwt_secret
    INFURA_URL=https://mainnet.infura.io/v3/YOUR_INFURA_PROJECT_ID

4.  Sunucuyu başlatın

    ```bash
    npm start