import { ethers } from 'ethers';

// Stake Tokens
export const stakeTokens = async (privateKey, stakingContractAddress, amount, network) => {
  try {
    const provider = new ethers.providers.JsonRpcProvider(network);
    const wallet = new ethers.Wallet(privateKey, provider);

    const stakingContract = new ethers.Contract(
      stakingContractAddress,
      [
        'function stake(uint256 amount) public',
        'function withdraw(uint256 amount) public',
        'function getReward() public',
      ],
      wallet
    );

    const tx = await stakingContract.stake(ethers.utils.parseUnits(amount, 'ether'));
    await tx.wait();
    return tx;
  } catch (err) {
    console.error('Staking işlemi hatası:', err);
    throw err;
  }
};

// Unstake Tokens
export const unstakeTokens = async (privateKey, stakingContractAddress, amount, network) => {
  try {
    const provider = new ethers.providers.JsonRpcProvider(network);
    const wallet = new ethers.Wallet(privateKey, provider);

    const stakingContract = new ethers.Contract(
      stakingContractAddress,
      [
        'function stake(uint256 amount) public',
        'function withdraw(uint256 amount) public',
        'function getReward() public',
      ],
      wallet
    );

    const tx = await stakingContract.withdraw(ethers.utils.parseUnits(amount, 'ether'));
    await tx.wait();
    return tx;
  } catch (err) {
    console.error('Unstake işlemi hatası:', err);
    throw err;
  }
};

// Claim Rewards
export const claimRewards = async (privateKey, stakingContractAddress, network) => {
  try {
    const provider = new ethers.providers.JsonRpcProvider(network);
    const wallet = new ethers.Wallet(privateKey, provider);

    const stakingContract = new ethers.Contract(
      stakingContractAddress,
      [
        'function stake(uint256 amount) public',
        'function withdraw(uint256 amount) public',
        'function getReward() public',
      ],
      wallet
    );

    const tx = await stakingContract.getReward();
    await tx.wait();
    return tx;
  } catch (err) {
    console.error('Ödül toplama hatası:', err);
    throw err;
  }
};

// Provide Liquidity
export const provideLiquidity = async (privateKey, liquidityPoolAddress, tokenA, tokenB, amountA, amountB, network) => {
  try {
    const provider = new ethers.providers.JsonRpcProvider(network);
    const wallet = new ethers.Wallet(privateKey, provider);

    const liquidityPoolContract = new ethers.Contract(
      liquidityPoolAddress,
      [
        'function addLiquidity(address tokenA, address tokenB, uint256 amountADesired, uint256 amountBDesired) public',
        'function removeLiquidity(address tokenA, address tokenB, uint256 liquidity) public',
      ],
      wallet
    );

    const tx = await liquidityPoolContract.addLiquidity(tokenA, tokenB, ethers.utils.parseUnits(amountA, 'ether'), ethers.utils.parseUnits(amountB, 'ether'));
    await tx.wait();
    return tx;
  } catch (err) {
    console.error('Likidite sağlama hatası:', err);
    throw err;
  }
};

// Remove Liquidity
export const removeLiquidity = async (privateKey, liquidityPoolAddress, tokenA, tokenB, liquidity, network) => {
  try {
    const provider = new ethers.providers.JsonRpcProvider(network);
    const wallet = new ethers.Wallet(privateKey, provider);

    const liquidityPoolContract = new ethers.Contract(
      liquidityPoolAddress,
      [
        'function addLiquidity(address tokenA, address tokenB, uint256 amountADesired, uint256 amountBDesired) public',
        'function removeLiquidity(address tokenA, address tokenB, uint256 liquidity) public',
      ],
      wallet
    );

    const tx = await liquidityPoolContract.removeLiquidity(tokenA, tokenB, ethers.utils.parseUnits(liquidity, 'ether'));
    await tx.wait();
    return tx;
  } catch (err) {
    console.error('Likidite çekme hatası:', err);
    throw err;
  }
};

// Automatic Investment Bot (for illustrative purposes)
export const automaticInvestment = async (privateKey, strategies, network) => {
  try {
    const provider = new ethers.providers.JsonRpcProvider(network);
    const wallet = new ethers.Wallet(privateKey, provider);

    for (let strategy of strategies) {
      const { contractAddress, method, params } = strategy;
      const contract = new ethers.Contract(contractAddress, [method], wallet);
      const tx = await contract[method](...params);
      await tx.wait();
    }

    return { msg: 'Otomatik yatırım işlemleri tamamlandı' };
  } catch (err) {
    console.error('Otomatik yatırım hatası:', err);
    throw err;
  }
};