function CurrencySelector({ currency, setCurrency }) {
  return (
    <select
      value={currency}
      onChange={(e) => setCurrency(e.target.value)}
      className="p-2 rounded bg-gray-100 text-black dark:bg-gray-700 dark:text-white ml-2 mb-4"
    >
      <option value="usd">USD</option>
      <option value="eur">EUR</option>
      <option value="btc">BTC</option>
    </select>
  );
}

export default CurrencySelector;
