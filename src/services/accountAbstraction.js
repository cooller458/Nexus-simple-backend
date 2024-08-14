import { ethers } from 'ethers';

// İşlem Onayı
export const approveTransaction = async (privateKey, contractAddress, spender, amount, network) => {
  try {
    const provider = new ethers.providers.JsonRpcProvider(network);
    const wallet = new ethers.Wallet(privateKey, provider);

    const contract = new ethers.Contract(
      contractAddress,
      [
        'function approve(address spender, uint256 amount) public returns (bool)',
      ],
      wallet
    );

    const tx = await contract.approve(spender, ethers.utils.parseUnits(amount, 'ether'));
    await tx.wait();
    return tx;
  } catch (err) {
    console.error('İşlem onayı hatası:', err);
    throw err;
  }
};

// Sponsorlu İşlem
export const sponsorTransaction = async (privateKey, userAddress, transactionData, sponsorAddress, network) => {
  try {
    const provider = new ethers.providers.JsonRpcProvider(network);
    const wallet = new ethers.Wallet(privateKey, provider);

    const tx = {
      from: sponsorAddress,
      to: userAddress,
      data: transactionData,
      gasLimit: ethers.utils.hexlify(100000),
      gasPrice: ethers.utils.parseUnits('10', 'gwei')
    };

    const transaction = await wallet.sendTransaction(tx);
    await transaction.wait();
    return transaction;
  } catch (err) {
    console.error('Sponsorlu işlem hatası:', err);
    throw err;
  }
};

// Dinamik İşlem Mantığı
export const executeDynamicTransaction = async (privateKey, contractAddress, methodName, params, network) => {
  try {
    const provider = new ethers.providers.JsonRpcProvider(network);
    const wallet = new ethers.Wallet(privateKey, provider);

    const contract = new ethers.Contract(
      contractAddress,
      [methodName],
      wallet
    );

    const tx = await contract[methodName](...params);
    await tx.wait();
    return tx;
  } catch (err) {
    console.error('Dinamik işlem hatası:', err);
    throw err;
  }
};