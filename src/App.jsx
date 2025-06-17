import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import CoinDetails from './pages/CoinDetails';

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black text-white flex flex-col">
      <div className="flex-grow">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/coin/:id" element={<CoinDetails />} />
        </Routes>
      </div>

      {/* Footer */}
      <footer className="text-center text-sm text-white/50 py-6">
        Built by <span className="text-white font-semibold">Abduzar Khabib</span> • 2025
      </footer>
    </div>
  );
}

export default App;