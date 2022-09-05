import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import StockDetailPage from './pages/StockDetailPage';
import StockOverviewPage from './pages/StockOverviewPage';
import { WatchlistContextProvider } from './context/watchlistContext';

function App() {
  return (
    <div className='container'>
      <WatchlistContextProvider>
        <Router>
          <Routes>
            <Route path="/" element={<StockOverviewPage />} />
            <Route path="/detail/:symbol" element={<StockDetailPage />} />
          </Routes>
        </Router>
      </WatchlistContextProvider>
    </div>
  );
}

export default App;
