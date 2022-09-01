import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import StockDetailPage from './pages/StockDetailPage';
import StockOverviewPage from './pages/StockOverviewPage';

function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<StockOverviewPage />} />
          <Route path="/detail/:symbol" element={<StockDetailPage />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
