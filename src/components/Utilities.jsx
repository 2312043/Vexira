// utils.js

export const formatPercentage = (num) => parseFloat(num).toFixed(2) + '%';

export const formatCurrency = (num) => '$' + parseFloat(num).toLocaleString('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 2 }).slice(1);

export const formatSupply = (num) => {
    const absNum = Math.abs(num);
    if (absNum >= 1.0e+12) {
      return (absNum / 1.0e+12).toFixed(2) + "T";
    } else if (absNum >= 1.0e+9) {
      return (absNum / 1.0e+9).toFixed(2) + "B";
    } else if (absNum >= 1.0e+6) {
      return (absNum / 1.0e+6).toFixed(2) + "M";
    } else if (absNum >= 1.0e+3) {
      return (absNum / 1.0e+3).toFixed(2) + "K";
    } else {
      return absNum.toFixed(2);
    }
  };

export const addDollarSymbol = (value) => {
    if (!value) return '';
    return `$${value}`;
  };


export const stripDollarSymbol = (value) => {
    if (!value) return '';
    return value.replace('$', '');
  };

