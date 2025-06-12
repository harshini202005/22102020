import React from 'react';

function stock({ stocks, onSelect }) {
  return (
    <div>
      <label>Select Stock: </label>
      <select onChange={e => onSelect(e.target.value)}>
        <option value="">-- Select --</option>
        {Object.entries(stocks).map(([name, symbol]) => (
          <option key={symbol} value={symbol}>{name} ({symbol})</option>
        ))}
      </select>
    </div>
  );
}

export default stock;
