import React, { createContext, useState } from 'react';

export const WatchlistContext = createContext();

export const WatchlistProvider = ({ children }) => {
  const [watchlist, setWatchlist] = useState([]);

  const addToWatchlist = (crypto, alertPrice = '', alertType = '') => {
    setWatchlist(prevWatchlist => {
      const existingCrypto = prevWatchlist.find(item => item.id === crypto.id);
      if (existingCrypto) {
        const updatedAlerts = { ...existingCrypto.alerts, [alertType]: alertPrice };
        return prevWatchlist.map(item =>
          item.id === crypto.id
            ? { ...item, alerts: updatedAlerts }
            : item
        );
      } else {
        const newCrypto = { ...crypto, alerts: { min: null, max: null } };
        if (alertType === 'min') {
          newCrypto.alerts.min = alertPrice;
        } else if (alertType === 'max') {
          newCrypto.alerts.max = alertPrice;
        }
        return [...prevWatchlist, newCrypto];
      }
    });
  };
    

  const removeFromWatchlist = (cryptoId) => {
    setWatchlist(prevWatchlist => prevWatchlist.filter(item => item.id !== cryptoId));
  };

  return (
    <WatchlistContext.Provider value={{ watchlist, addToWatchlist, removeFromWatchlist }}>
      {children}
    </WatchlistContext.Provider>
  );
};
