import { useEffect, useState } from 'react';
import { fetchTopCoins } from '../services/cryptoAPI';
import CryptoCard from '../components/CryptoCard';
import SearchBar from '../components/SearchBar';
import CurrencySelector from '../components/CurrencySelector';

function Home() {
  const [coins, setCoins] = useState([]);
  const [search, setSearch] = useState('');
  const [currency, setCurrency] = useState('usd');

  useEffect(() => {
    const loadCoins = async () => {
      const data = await fetchTopCoins(currency);
      setCoins(data);
    };
    loadCoins();
  }, [currency]);

  const filtered = coins.filter((coin) =>
    coin.name.toLowerCase().includes(search.toLowerCase()) ||
    coin.symbol.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <main className="p-4 max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold text-center mb-4 text-white">Crypto Tracker 🪙</h1>

      {/* ⚠️ Aesthetic Instruction Box */}
      <div className="bg-white/10 backdrop-blur-md border border-white/20 p-4 rounded-lg text-sm text-white text-center mb-6 shadow">
        ⚠️ This is a public demo using a free version of the CoinGecko API via a proxy.<br />
        If someone else recently opened a coin page, you may not be able to access it due to shared rate limits.<br />
        Please wait a few minutes and try again. Thank you for understanding 🙏
      </div>

      <div className="flex flex-col sm:flex-row items-center justify-between mb-6">
        <SearchBar search={search} setSearch={setSearch} />
        <CurrencySelector currency={currency} setCurrency={setCurrency} />
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
        {filtered.map((coin) => (
          <CryptoCard key={coin.id} coin={coin} currency={currency} />
        ))}
      </div>
    </main>
  );
}

export default Home;
