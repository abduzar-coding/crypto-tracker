import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  LineElement,
  PointElement,
  LinearScale,
  CategoryScale,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(LineElement, PointElement, LinearScale, CategoryScale, Tooltip, Legend);

function CoinDetails() {
  const { id } = useParams();
  const [coin, setCoin] = useState(null);
  const [chartData, setChartData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchCoinDetails = async () => {
      setLoading(true);
      try {
        const res = await fetch(`https://api.coingecko.com/api/v3/coins/${id}`);
        if (!res.ok) throw new Error('Coin not found');
        const data = await res.json();
        setCoin(data);
      } catch (err) {
        console.error(err);
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    const fetchChart = async () => {
      try {
        const res = await fetch(
          `https://api.coingecko.com/api/v3/coins/${id}/market_chart?vs_currency=usd&days=7`
        );
        const data = await res.json();
        const labels = data.prices.map((item) =>
          new Date(item[0]).toLocaleDateString()
        );
        const prices = data.prices.map((item) => item[1]);
        setChartData({
          labels,
          datasets: [
            {
              label: 'Price (USD)',
              data: prices,
              borderColor: '#3b82f6',
              backgroundColor: 'rgba(59, 130, 246, 0.1)',
              fill: true,
              tension: 0.4,
            },
          ],
        });
      } catch (err) {
        console.error(err);
      }
    };

    fetchCoinDetails();
    fetchChart();
  }, [id]);

  if (loading) return <p className="text-center mt-10">Loading...</p>;
  if (error || !coin) return <p className="text-center mt-10 text-red-500">Coin not found 🥲</p>;

  return (
    <div className="max-w-4xl mx-auto p-6 text-white">
      <Link to="/" className="text-blue-400 hover:underline">← Back</Link>

      <div className="mt-6 bg-gray-800 p-6 rounded-xl shadow-md">
        <div className="flex items-center gap-4">
          <img src={coin.image.large} alt={coin.name} className="w-16 h-16" />
          <div>
            <h1 className="text-3xl font-bold">{coin.name}</h1>
            <p className="uppercase text-gray-400">{coin.symbol}</p>
            <p className="mt-2 text-xl font-semibold">
              {coin.market_data?.current_price?.usd
                ? `$${coin.market_data.current_price.usd.toLocaleString()}`
                : 'N/A'}
            </p>
          </div>
        </div>

        <p className="mt-4 text-gray-300">
          Rank: <span className="font-bold text-white">{coin.market_cap_rank}</span>
        </p>

        <div
          className="mt-6 prose prose-invert max-w-none"
          dangerouslySetInnerHTML={{ __html: coin.description?.en?.split('. ')[0] + '.' }}
        />
      </div>

      {chartData && (
        <div className="mt-10 bg-gray-900 p-4 rounded-xl">
          <h2 className="text-xl font-bold mb-4">7-Day Price Chart</h2>
          <Line data={chartData} options={{ responsive: true, plugins: { legend: { display: false } } }} />
        </div>
      )}
    </div>
  );
}

export default CoinDetails;