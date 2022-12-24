import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import BlockPage from './pages/BlockPage';
import Home from './pages/Home';
import TransactionPage from './pages/TransactionPage';
import Profile from './pages/Profile';
import Header from './components/Header';

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/transaction/:id" element={<TransactionPage />} />
        <Route path="/block/:id" element={<BlockPage />} />
        <Route path="/profile/:id" element={<Profile />} />
      </Routes>
    </Router>
  );
}

export default App;
