import { ethers } from 'ethers';
import { resolveENSName } from './ensService.js';

// Kullanıcı Adı ile Transfer
export const transferWithUsername = async (privateKey, username, amount, network, ens = false) => {
  try {
    const provider = new ethers.providers.JsonRpcProvider(network);
    const wallet = new ethers.Wallet(privateKey, provider);

    let toAddress;
    if (ens) {
      toAddress = await resolveENSName(username, network);
    } else {
      // Kullanıcı adını adresle ilişkilendiren veritabanı sorgusu burada yapılabilir.
      // Basit bir örnek olarak, adresi doğrudan username olarak kabul ediyoruz.
      toAddress = username;
    }

    const tx = {
      to: toAddress,
      value: ethers.utils.parseEther(amount),
    };

    const transaction = await wallet.sendTransaction(tx);
    await transaction.wait();
    return transaction;
  } catch (err) {
    console.error('Kullanıcı adı ile transfer hatası:', err);
    throw err;
  }
};