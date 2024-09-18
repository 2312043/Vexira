import React from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import Menu from './components/Menu';
import Home from './components/Home';
import Coins from './components/Coins';
import Visual from './components/Visual';
import NoPage from './components/NoPage';
import Watchlist from './components/Watchlist';
import { WatchlistProvider } from './components/WatchlistContext';
import { ToastContainer } from 'react-toastify'; 
import 'react-toastify/dist/ReactToastify.css'; 

function App() {
  return (
    <WatchlistProvider>
      <BrowserRouter>
        <Menu />
        <Routes>
          <Route path="/coins" element={<Coins />} />
          <Route path="/visual" element={<Visual />} />
          <Route path="/watchlist" element={<Watchlist />} />
          <Route path="*" element={<NoPage />} />
          <Route path="/" index element={<Home />} />
        </Routes>
        <footer class="footer">
    <div class="footer-left">
    <img src="src/assets/logo-black.png" alt="Logo" />
    </div>
    <div class="footer-center">
    <h2>Copyright</h2>
    <h4>St Mary's University</h4>
    </div>
    <div class="footer-right">
                <h4><Link to="/">Home</Link></h4>
                <h4><Link to="/coins">Coins</Link></h4>
                <h4><Link to="/watchlist">Watchlist</Link></h4>
    </div>
        </footer>
        <ToastContainer 
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="colored"
        />
      </BrowserRouter>
    </WatchlistProvider>
  );
}

export default App;
