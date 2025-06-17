import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import CoinDetails from './pages/CoinDetails';

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black text-white">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/coin/:id" element={<CoinDetails />} />
      </Routes>
    </div>
  );
}

export default App;