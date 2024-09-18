import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import './Home.css';
import { formatPercentage, formatCurrency} from './Utilities';

function Home() {
    const [topCoins, setTopCoins] = useState([]);

    useEffect(() => {
        const fetchTopCoins = async () => {
            try {
                const response = await fetch("https://api.coincap.io/v2/assets?limit=20");
                const data = await response.json();
                setTopCoins(data.data);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        fetchTopCoins();
    }, []);

    return (
        <div>
            <header className="hero-section">
                <div className="container mx-auto">
                    <div className="row">
                        <div className="two-columns">
                            <div className="col">
                                <div className="header-content">
                                    <h1>Welcome to Vexira</h1>
                                    <h2>Your Gateway to the Cryptocurrency World</h2>
                                    <div className="button-group">
                                        <button className="btn-primary"><a href="/coins">Explore Cryptos</a></button>
                                    </div>
                                </div>
                            </div>
                            <div className="col">
                                <div className="home-logo">
                                    <img src="src/assets/logo.png" alt="St Mary’s Cryptos Logo" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </header>
            <div className="banner-container">
                <div className="banner">
                    {topCoins.map(coin => (
                        <div key={coin.id} className="banner-items">
                            <img src={`https://assets.coincap.io/assets/icons/${coin.symbol.toLowerCase()}@2x.png`} alt={coin.name} />
                            <div key={coin.id} className="banner-item">
                            <div className="crypto-name">{coin.name}</div>                        
                            <div className="crypto-price">{formatCurrency(coin.priceUsd)}</div>
                            <div className={`crypto-value ${coin.changePercent24Hr >= 0 ? 'positive' : 'negative'}`}>
                                    {formatPercentage(coin.changePercent24Hr)}
                                </div>
                            </div>                             
                        </div>               
                    ))}
                </div>
            </div>
            <main className="container mx-auto">
                <div className="row">
                    <div className="card-container">
                        <div className="card">
                            <h2>Market Insights</h2>
                            <p>Gain access to real-time market data, including price fluctuations, trading volume, and market trends. Our comprehensive insights help you make informed decisions and stay ahead of the curve in the dynamic world of cryptocurrencies.</p>
                            <button className="btn-primary">
                            <Link to="/coins" className="col-sm-12">View Insights</Link>
                            </button>
                        </div>
                        <div className="card">
                            <h2>Personal Watchlist</h2>
                            <p>Unlock a suite of powerful trading tools designed to enhance your cryptocurrency trading experience. From advanced charting tools to customizable trading signals, our platform equips you with the resources you need to execute successful trades with confidence.</p>
                            <button className="btn-primary">
                            <Link to="/watchlist" className="col-sm-12">View Watchlist</Link>
                            </button>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="about">
                        <h2>About Us</h2>
                        <p>At Vexira, we aim to provide you with comprehensive insights and analysis of the cryptocurrency market. Our platform offers a range of features tailored for cryptocurrency enthusiasts, traders, and investors, ensuring you have the tools you need to navigate the dynamic world of cryptocurrencies.</p>
                    </div>
                </div>
                <div className="row">
                <div className="features-section">
    <div className="feature-card">
        <img src="src/assets/analysis.svg" alt="Market Analysis" />
        <h3>Market Analysis</h3>
        <p>Access detailed market data and analysis for informed decision-making.</p>
    </div>
    <div className="feature-card">
        <img src="src/assets/alerts.svg" alt="Trade Alerts" />
        <h3>Trade Alerts</h3>
        <p>Set custom price alerts to stay informed about trading opportunities.</p>
    </div>
    <div className="feature-card">
        <img src="src/assets/secure.svg" alt="Secure Transactions" />
        <h3>Safe and Secure</h3>
        <p>Prioritizes user privacy and security by not collecting personal user data.</p>
    </div>
    <div className="feature-card">
        <img src="src/assets/forum.svg" alt="Community Forum" />
        <h3>24/7 Support</h3>
        <p>Get round-the-clock support to address any queries or concerns.</p>
    </div>
    <div className="feature-card">
        <img src="src/assets/wallet.svg" alt="Wallet Integration" />
        <h3>Dynamic Visualization</h3>
        <p>Insightful visualizations to understand cryptocurrency trends.</p>
    </div>
    <div className="feature-card">
        <img src="src/assets/books.svg" alt="Educational Resources" />
        <h3>Real-time Converter</h3>
        <p>Convert cryptocurrency prices in real-time for quick & convenient transactions.</p>
    </div>
</div>

                </div>
            </main>
        </div>
    );
}

export default Home;
