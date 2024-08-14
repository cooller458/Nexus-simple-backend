import { ethers } from 'ethers';

// İşlem Gönder
export const sendTransaction = async (req, res) => {
  const { privateKey, to, amount, network } = req.body;
  try {
    const provider = new ethers.providers.JsonRpcProvider(network);
    const wallet = new ethers.Wallet(privateKey, provider);
    const tx = {
      to,
      value: ethers.utils.parseEther(amount),
      gasLimit: 21000,
    };
    const transaction = await wallet.sendTransaction(tx);
    await transaction.wait();
    res.json(transaction);
  } catch (err) {
    console.error('İşlem gönderme hatası:', err);
    res.status(500).send('Sunucu hatası');
  }
};

// İşlem Durumunu Takip Et
export const getTransactionStatus = async (req, res) => {
  const { txHash, network } = req.params;
  try {
    const provider = new ethers.providers.JsonRpcProvider(network);
    const receipt = await provider.getTransactionReceipt(txHash);
    if (!receipt) {
      return res.status(404).json({ msg: 'İşlem bulunamadı' });
    }
    res.json(receipt);
  } catch (err) {
    console.error('İşlem durumu takip hatası:', err);
    res.status(500).send('Sunucu hatası');
  }
};