import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Coins.css";
import { formatPercentage, formatCurrency, formatSupply} from './Utilities';

function Coins() {
    const [chartData2, setChartData2] = useState(null);
    const [visibleItems, setVisibleItems] = useState(20);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch("https://api.coincap.io/v2/assets/");
                const data = await response.json();
                setChartData2(data); // Update chartData2 state with fetched data
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        fetchData();
    }, []);

    const handleViewMore = () => {
        setVisibleItems(visibleItems + 20);
    };

    const handleRowClick = (crypto) => {
        navigate('/visual', { state: { crypto } });
    };

    const getLogoUrl = (symbol) => {
        return `https://assets.coincap.io/assets/icons/${symbol.toLowerCase()}@2x.png`;
    };

    return (
        <div>
            <header className="data-header-content">
                <div className="container mx-auto">
                    <div className="row">
                        <h1>Crypto Currencies</h1>
                        <h2>Comprehensive insights and analysis of the cryptocurrency market</h2>
                    </div>
                </div>
            </header>
            <div className="card-c">
                {chartData2 ? (
                    <div className="crypto-list">
                        <div className="crypto-row crypto-header">
                            <div className="crypto-rank">Rank</div>
                            <div className="crypto-logo">Logo</div>
                            <div className="crypto-name">Name</div>
                            <div className="crypto-symbol">Symbol</div>
                            <div className="crypto-prices">Price (USD)</div>
                            <div className="crypto-supply">Supply</div>
                            <div className="crypto-change">Change % (24Hr)</div>
                        </div>
                        {chartData2.data.slice(0, visibleItems).map((crypto) => (
                            <div key={crypto.id} className="crypto-row" onClick={() => handleRowClick(crypto)}>
                                <div className="crypto-rank">{crypto.rank}</div>
                                <div className="crypto-logo">
                                    <img className="crypto-logos" src={getLogoUrl(crypto.symbol)} alt={`${crypto.name} Logo`} />
                                </div>
                                <div className="crypto-name">{crypto.name}</div>
                                <div className="crypto-symbol">{crypto.symbol}</div>
                                <div className="crypto-price">{formatCurrency(crypto.priceUsd)}</div>
                                <div className="crypto-volume">{formatSupply(crypto.supply)}</div>
                                <div className={`crypto-value ${crypto.changePercent24Hr >= 0 ? 'positive' : 'negative'}`}>
                                    {formatPercentage(crypto.changePercent24Hr)}
                                </div>
                            </div>
                        ))}
                        {visibleItems < chartData2.data.length && (
                            <button className="btn-primary-data" onClick={handleViewMore}>View More</button>
                        )}
                    </div>
                ) : (
                    <p>Loading data...</p>
                )}
            </div>
        </div>
    );
}

export default Coins;
