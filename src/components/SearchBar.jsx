function SearchBar({ search, setSearch }) {
  return (
    <input
      type="text"
      placeholder="Search coin..."
      value={search}
      onChange={(e) => setSearch(e.target.value)}
      className="w-full sm:w-72 p-2 rounded bg-gray-100 text-black dark:bg-gray-700 dark:text-white mb-4"
    />
  );
}

export default SearchBar;