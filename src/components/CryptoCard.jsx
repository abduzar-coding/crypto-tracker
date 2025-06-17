import { Link } from 'react-router-dom';

function CryptoCard({ coin, currency }) {
  const symbols = {
    usd: '$',
    eur: '€',
    btc: '₿',
  };

  const currencySymbol = symbols[currency] || '';

  return (
    <Link to={`/coin/${coin.id}`}>
      <div className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow-md text-center hover:scale-105 transition-transform">
        <img src={coin.image} alt={coin.name} className="w-12 h-12 mx-auto mb-2" />
        <h2 className="font-bold text-lg">{coin.name}</h2>
        <p className="text-sm text-gray-500 uppercase">{coin.symbol}</p>
        <p className="text-xl font-semibold mt-2">
          {currencySymbol}
          {coin.current_price.toLocaleString()}
        </p>
        <p
          className={`mt-1 font-medium ${
            coin.price_change_percentage_24h > 0 ? 'text-green-500' : 'text-red-500'
          }`}
        >
          {coin.price_change_percentage_24h.toFixed(2)}%
        </p>
      </div>
    </Link>
  );
}

export default CryptoCard;