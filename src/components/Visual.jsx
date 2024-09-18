import React, { useEffect, useRef, useState, useContext } from "react";
import { useLocation } from "react-router-dom";
import Chart from "chart.js/auto";
import { WatchlistContext } from './WatchlistContext';
import "./Visual.css";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { formatPercentage, formatCurrency, formatSupply, addDollarSymbol, stripDollarSymbol } from './Utilities';

const Visual = () => {
  const chartRef = useRef(null);
  const chartInstance = useRef(null);
  const location = useLocation();
  const { crypto } = location.state;
  const [historicalData, setHistoricalData] = useState(null);
  const [coinAmount, setCoinAmount] = useState('');
  const [currencyAmount, setCurrencyAmount] = useState('');
  const [minAlertPrice, setMinAlertPrice] = useState('');
  const [maxAlertPrice, setMaxAlertPrice] = useState('');
  const { addToWatchlist } = useContext(WatchlistContext);

  useEffect(() => {
    const fetchHistoricalData = async () => {
      try {
        const response = await fetch(`https://api.coincap.io/v2/assets/${crypto.id}/history?interval=d1`);
        const data = await response.json();
        setHistoricalData(data);
      } catch (error) {
        console.error("Error fetching historical data:", error);
      }
    };

    fetchHistoricalData();
  }, [crypto.id]);

  useEffect(() => {
    if (!chartRef.current || !historicalData) return;

    if (chartInstance.current) {
      chartInstance.current.destroy(); // Destroy the previous chart instance
    }

    const ctx = chartRef.current.getContext("2d");

    const cryptoDates = historicalData.data.map(history => {
      const date = new Date(history.date);
      return `${date.toLocaleString('en-us', { month: 'short' })} ${date.getFullYear()}`;
    });

    const cryptoPrices = historicalData.data.map(history => parseFloat(history.priceUsd));

    chartInstance.current = new Chart(ctx, {
      type: "line",
      data: {
        labels: cryptoDates,
        datasets: [
          {
            label: "Price (USD)",
            data: cryptoPrices,
            backgroundColor: "rgba(6, 90, 96, 0.2)",
            borderColor: "#065A60",
            pointHoverBackgroundColor: "#4D194D",
            pointHoverBorderColor: "#4D194D"
          },
          {
            label: "", // Empty label to hide it in the legend
            data: cryptoPrices, // Use the same data as the line graph
            backgroundColor: "rgba(6, 90, 96, 0.1)", // Adjust opacity as needed
            fill: 'origin', // Fill from the origin (bottom)
            borderWidth: 0 // No border
          }
        ],
      },
      options: {
        scales: {
          y: {
            beginAtZero: false,
            ticks: {
              callback: function(value) {
                return `$${value}`;
              },
              color: 'white' 
            },
          },
          x: {
            ticks: {
              color: 'white' 
            }
          }
        },
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            display: false // Hide the legend
          },
        },
      },
    });
    

    return () => {
      if (chartInstance.current) {
        chartInstance.current.destroy(); // Cleanup chart instance on component unmount
      }
    };
  }, [historicalData]);

  useEffect(() => {
    const checkPriceAlert = async () => {
      if (!minAlertPrice && !maxAlertPrice) return;

      try {
        const response = await fetch(`https://api.coincap.io/v2/assets/${crypto.id}`);
        const data = await response.json();
        const currentPrice = parseFloat(data.data.priceUsd);
        
        if (minAlertPrice && currentPrice <= parseFloat(minAlertPrice)) {
          toast.info(`Price Alert: ${crypto.name} has fallen below $${minAlertPrice}`, {
            className: 'custom-toast',
            bodyClassName: 'custom-toast-body',
            closeButtonClassName: 'custom-toast-close',
            progressClassName: 'custom-toast-progress',
          });
          setMinAlertPrice('');
        }
        
        if (maxAlertPrice && currentPrice >= parseFloat(maxAlertPrice)) {
          toast.info(`Price Alert: ${crypto.name} has risen above $${maxAlertPrice}`, {
            className: 'custom-toast',
            bodyClassName: 'custom-toast-body',
            closeButtonClassName: 'custom-toast-close',
            progressClassName: 'custom-toast-progress',
          });
          setMaxAlertPrice('');
        }
      } catch (error) {
        console.error("Error checking price alert:", error);
      }
    };

    const interval = setInterval(checkPriceAlert, 60000); // Check every 60 seconds

    return () => clearInterval(interval);
  }, [minAlertPrice, maxAlertPrice, crypto.id, crypto.name]);

  const handleAddToWatchlist = () => {
    addToWatchlist(crypto);
  };

  const handleCoinChange = (event) => {
    const coinValue = event.target.value;
    const pricePerCoin = parseFloat(crypto.priceUsd);
    const currencyValue = coinValue ? (parseFloat(coinValue) * pricePerCoin).toFixed(2) : '';
    setCoinAmount(coinValue);
    setCurrencyAmount(addDollarSymbol(currencyValue));
  };

  const handleCurrencyChange = (event) => {
    const currencyValue = stripDollarSymbol(event.target.value);
    const pricePerCoin = parseFloat(crypto.priceUsd);
    const coinValue = currencyValue ? (parseFloat(currencyValue) / pricePerCoin).toFixed(6) : '';
    setCurrencyAmount(addDollarSymbol(currencyValue));
    setCoinAmount(coinValue);
  };

  const handleMinAlertChange = (event) => {
    setMinAlertPrice(event.target.value);
  };

  const handleMaxAlertChange = (event) => {
    setMaxAlertPrice(event.target.value);
  };

  const handleSetMinAlert = () => {
    addToWatchlist(crypto, minAlertPrice, 'min');
  };

  const handleSetMaxAlert = () => {
    addToWatchlist(crypto, maxAlertPrice, 'max');
  };

  const logoUrl = `https://assets.coincap.io/assets/icons/${crypto.symbol.toLowerCase()}@2x.png`;

  return (
    <div>
      <div className="header-crypto">
        <div className="left">
          <img className="crypto-logo" src={logoUrl} alt={`${crypto.name} Logo`} />
          <div>
            <div className="title">{crypto.name} ({crypto.symbol})</div>
            <div className="right">
              <div className="cryptos-price">{formatCurrency(crypto.priceUsd)}</div>
              <div className={`cryptos-value ${crypto.changePercent24Hr >= 0 ? 'positive' : 'negative'}`}>
                {formatPercentage(crypto.changePercent24Hr)}
              </div>
            </div>
          </div>
        </div>
        <div className="rights">
          <div className="info">Market Cap: {formatSupply(crypto.marketCapUsd)}</div>
          <div className="info">Volume (24Hr): {formatSupply(crypto.volumeUsd24Hr)}</div>
          <div className="info">Supply: {formatSupply(crypto.supply)}</div>
        </div>
        <button className="btn-primary" onClick={handleAddToWatchlist}>Add to Watchlist</button>
      </div>
      <main className="main">
        <div className="chart-swap-container">
          <div className="chart-container">
            <canvas ref={chartRef}></canvas>
          </div>
          <div className="swap-container">
            <div className="buy-section">
              <h2>Converter</h2>
              <input
                type="text"
                value={coinAmount}
                onChange={handleCoinChange}
                placeholder={`Enter coin amount (${crypto.symbol})`}
              />
              <input
                type="text"
                value={currencyAmount}
                onChange={handleCurrencyChange}
                placeholder="Enter currency amount ($USD)"
              />
            </div>
            <div className="alert-section">
              <h2>Set Price Alert</h2>
              <div className="alert-sections">
                <input
                  type="text"
                  value={minAlertPrice}
                  onChange={handleMinAlertChange}
                  placeholder="Enter min alert price ($USD)"
                />
                <button className="btn-primary" onClick={handleSetMinAlert}>Set Min Alert</button>
              </div>
              <div className="alert-sections">
                <input
                  type="text"
                  value={maxAlertPrice}
                  onChange={handleMaxAlertChange}
                  placeholder="Enter max alert price ($USD)"
                />
                <button className="btn-primary" onClick={handleSetMaxAlert}>Set Max Alert</button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Visual;
