import React from 'react';
import { Line } from 'react-chartjs-2';
import { Chart, registerables } from 'chart.js';

Chart.register(...registerables);

function stockChart({ stockData }) {
  const chartData = {
    labels: stockData.map(item => new Date(item.lastUpdatedAt).toLocaleTimeString()),
    datasets: [
      {
        label: 'Stock Price',
        data: stockData.map(item => item.price),
        fill: false,
        borderColor: '#007bff',
        tension: 0.1
      }
    ]
  };

  return (
    <div>
      <h3>📊 Price Chart</h3>
      <Line data={chartData} />
    </div>
  );
}

export default stockChart;


