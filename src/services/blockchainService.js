import { ethers } from 'ethers';
import dotenv from 'dotenv';
dotenv.config();

// Cüzdan Oluşturma
export const createWallet = () => {
  const wallet = ethers.Wallet.createRandom();
  return {
    privateKey: wallet.privateKey,
    address: wallet.address,
  };
};

// Bakiye Sorgulama
export const getBalance = async (address) => {
  try {
    const provider = new ethers.JsonRpcProvider(process.env.INFURA_URL);
    const balance = await provider.getBalance(address);
    return ethers.formatEther(balance);
  } catch (err) {
    console.error('Bakiye sorgulama hatası:', err);
    throw err;
  }
};

// Transfer İşlemi
export const sendTransaction = async (privateKey, to, amount) => {
  try {
    const wallet = new ethers.Wallet(privateKey);
    const provider = new ethers.JsonRpcProvider(process.env.INFURA_URL);
    const signer = wallet.connect(provider);

    const tx = await signer.sendTransaction({
      to,
      value: ethers.parseEther(amount),
    });

    await tx.wait();
    return tx;
  } catch (err) {
    console.error('Transfer işlemi hatası:', err);
    throw err;
  }
};