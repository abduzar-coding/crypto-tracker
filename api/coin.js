export default async function handler(req, res) {
  const { id, chart, ...rest } = req.query;

  let url;

  if (id === 'markets') {
    const params = new URLSearchParams(rest).toString();
    url = `https://api.coingecko.com/api/v3/coins/markets?${params}`;
  } else if (chart) {
    url = `https://api.coingecko.com/api/v3/coins/${id}/market_chart?vs_currency=usd&days=7`;
  } else {
    url = `https://api.coingecko.com/api/v3/coins/${id}`;
  }

  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error('CoinGecko error');
    const data = await response.json();
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.status(200).json(data);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch from CoinGecko' });
  }
}