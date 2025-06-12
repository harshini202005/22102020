import React, { useState } from 'react';
import axios from 'axios';

const API_MAP = {
  p: 'primes',
  f: 'fibo',
  e: 'even',
  r: 'rand'
};

const WINDOW_SIZE = 10;

function avg() {
  const [selectedType, setSelectedType] = useState('');
  const [windowState, setWindowState] = useState([]);
  const [prevState, setPrevState] = useState([]);
  const [fetchedNumbers, setFetchedNumbers] = useState([]);
  const [average, setAverage] = useState(null);
  const [responseJson, setResponseJson] = useState(null);

  const handleFetch = async () => {
    if (!selectedType) {
      alert("Please select a number type");
      return;
    }

    try {
      const url = `http://20.244.56.144/evaluation-service/${API_MAP[selectedType]}`;
      const response = await axios.get(url);
      const fetched = response.data.numbers;

      const newNumbers = fetched.filter(num => !windowState.includes(num));

      const previous = [...windowState];

      const updatedWindow = [...windowState, ...newNumbers].slice(-WINDOW_SIZE);

      const avg = updatedWindow.length > 0
        ? updatedWindow.reduce((acc, val) => acc + val, 0) / updatedWindow.length
        : 0;

      setPrevState(previous);
      setWindowState(updatedWindow);
      setFetchedNumbers(newNumbers);
      setAverage(avg.toFixed(2));

      setResponseJson({
        windowPrevState: previous,
        windowCurrState: updatedWindow,
        numbers: newNumbers,
        avg: parseFloat(avg.toFixed(2))
      });

    } catch (err) {
      console.error("Fetch failed:", err);
      alert("Error fetching numbers from the API.");
    }
  };

  return (
    <div>
      <label>
        <strong>Select Number Type:</strong>
        <select
          value={selectedType}
          onChange={e => setSelectedType(e.target.value)}
          style={{ marginLeft: '1rem' }}
        >
          <option value="">-- Choose --</option>
          <option value="p">Prime (p)</option>
          <option value="f">Fibonacci (f)</option>
          <option value="e">Even (e)</option>
          <option value="r">Random (r)</option>
        </select>
      </label>

      <button onClick={handleFetch} style={{ marginLeft: '1rem' }}>
        Fetch
      </button>

      <div style={{ marginTop: '2rem' }}>
        <h3>🧾 JSON Output:</h3>
        <pre>{JSON.stringify(responseJson, null, 2)}</pre>
      </div>
    </div>
  );
}

export default avg;


