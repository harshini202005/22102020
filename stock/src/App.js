import React, { useState, useEffect } from 'react';
import axios from 'axios';
import StockSelector from './Components/stock';
import StockChart from './Components/stockChart';

const AUTH_TOKEN = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJNYXBDbGFpbXMiOnsiZXhwIjoxNzQ5NzA5MzY3LCJpYXQiOjE3NDk3MDkwNjcsImlzcyI6IkFmZm9yZG1lZCIsImp0aSI6ImI3OTNiYjdhLWY5ZTctNGM4My1iNGQxLThlYzliMmU2NGNiYiIsInN1YiI6ImhhcnNoaW5pci5iYWkyMkByYXRoaW5hbS5pbiJ9LCJlbWFpbCI6ImhhcnNoaW5pci5iYWkyMkByYXRoaW5hbS5pbiIsIm5hbWUiOiJoYXJzaGluaSByIiwicm9sbE5vIjoiMjIxMDIwMjAiLCJhY2Nlc3NDb2RlIjoiTVZHd0VGIiwiY2xpZW50SUQiOiJiNzkzYmI3YS1mOWU3LTRjODMtYjRkMS04ZWM5YjJlNjRjYmIiLCJjbGllbnRTZWNyZXQiOiJkQ3JFV3JkVlZEYk1WWUN2In0.QsB1D-X5ARfPJhPXiX_t2Ge_QHyZTvhN5b-OhTp0St0"; 


function App() {
  const [stocks, setStocks] = useState({});
  const [selectedStock, setSelectedStock] = useState('');
  const [stockData, setStockData] = useState([]);

  useEffect(() => {
    axios.get('http://20.244.56.144/evaluation-service/stocks', {
      headers: {
        Authorization: AUTH_TOKEN
      }
    })
    .then(response => setStocks(response.data.stocks))
    .catch(err => console.error('Error fetching stock list:', err));
  }, []);

  useEffect(() => {
    if (selectedStock) {
      axios.get(`http://20.244.56.144/evaluation-service/stocks/${selectedStock}`, {
        headers: {
          Authorization: AUTH_TOKEN
        }
      })
      .then(response => setStockData(response.data))
      .catch(err => console.error('Error fetching stock data:', err));
    }
  }, [selectedStock]);

  return (
    <div style={{ padding: '2rem' }}>
      <h1>📈 Stock Price Viewer</h1>
      <StockSelector stocks={stocks} onSelect={setSelectedStock} />
      {selectedStock && <StockChart stockData={stockData} />}
    </div>
  );
}

export default App;
