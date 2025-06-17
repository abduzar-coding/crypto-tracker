const BASE_URL = 'https://corsproxy.io/?https://api.coingecko.com/api/v3';

export const fetchTopCoins = async (currency = 'usd') => {
  try {
    const res = await fetch(
      `${BASE_URL}/coins/markets?vs_currency=${currency}&order=market_cap_desc&per_page=20&page=1&sparkline=false`
    );
    if (!res.ok) throw new Error('Failed to fetch coins');
    return await res.json();
  } catch (err) {
    console.error(err);
    return [];
  }
};
