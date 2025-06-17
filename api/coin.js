export default async function handler(req, res) {
  const { id, chart } = req.query;

  const url = chart
    ? `https://api.coingecko.com/api/v3/coins/${id}/market_chart?vs_currency=usd&days=7`
    : `https://api.coingecko.com/api/v3/coins/${id}`;

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
