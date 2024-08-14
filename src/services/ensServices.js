import { ethers } from 'ethers';

// ENS Adı Çözümleme
export const resolveENSName = async (ensName, network) => {
  try {
    const provider = new ethers.providers.JsonRpcProvider(network);
    const address = await provider.resolveName(ensName);
    if (!address) {
      throw new Error('ENS adı çözümlenemedi');
    }
    return address;
  } catch (err) {
    console.error('ENS adı çözümleme hatası:', err);
    throw err;
  }
};

// ENS Adı Kontrol Etme
export const checkENSNameAvailability = async (ensName, network) => {
  try {
    const provider = new ethers.providers.JsonRpcProvider(network);
    const address = await provider.resolveName(ensName);
    return address === null;
  } catch (err) {
    console.error('ENS adı kontrol etme hatası:', err);
    throw err;
  }
};