import React, { useContext } from 'react';
import { WatchlistContext } from './WatchlistContext';
import './Watchlist.css';

const Watchlist = () => {
  const { watchlist, removeFromWatchlist } = useContext(WatchlistContext);

  return (
    <div className="watchlist-page">
      <h1>Your Watchlist</h1>
      {watchlist.length === 0 ? (
        <p>No cryptocurrencies added to the watchlist yet.</p>
      ) : (
        <div className="watchlist-container">
          {watchlist.map((crypto) => (
            <div key={crypto.id} className="watchlist-item">
              <img className="wcrypto-logo" src={`https://assets.coincap.io/assets/icons/${crypto.symbol.toLowerCase()}@2x.png`} alt={`${crypto.name} Logo`} />
              <div className="wcrypto-details">
                <div className="wcrypto-name">{crypto.name} ({crypto.symbol})</div>
                <div className={`crypto-price ${crypto.priceReached ? 'reached' : ''}`}>${parseFloat(crypto.priceUsd).toFixed(2)}</div>
                <div className={`cryptos-value ${crypto.changePercent24Hr >= 0 ? 'positive' : 'negative'} ${crypto.priceReached ? 'reached' : ''}`}>{parseFloat(crypto.changePercent24Hr).toFixed(2)}%</div>
                {crypto.alerts.min !== null && (
                  <div className={`crypto-alert ${crypto.minAlertReached ? 'reached' : ''}`}>
                    Min Alert Price: {crypto.alerts.min ? `$${parseFloat(crypto.alerts.min).toFixed(5)}` : 'Not Set'}
                  </div>
                )}
                {crypto.alerts.max !== null && (
                  <div className={`crypto-alert ${crypto.maxAlertReached ? 'reached' : ''}`}>
                    Max Alert Price: {crypto.alerts.max ? `$${parseFloat(crypto.alerts.max).toFixed(5)}` : 'Not Set'}
                  </div>
                )}
                <button className="btn-remove" onClick={() => removeFromWatchlist(crypto.id)}>Remove</button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Watchlist;
