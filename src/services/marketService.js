import axios from 'axios';

export const getMarketData = async (symbol) => {
  try {
    const response = await axios.get(`https://api.coingecko.com/api/v3/simple/price`, {
      params: {
        ids: symbol,
        vs_currencies: 'usd',
      },
    });
    return response.data;
  } catch (err) {
    console.error('Piyasa verisi alma hatası:', err);
    throw err;
  }
};