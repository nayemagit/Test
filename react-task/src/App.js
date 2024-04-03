import React, { useState } from 'react';

const App = () => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState(null);

  const showResult = (resultList) => resultList.map((result) => {
    return `<p>ID: ${result.id}, Title: ${result.l} [${result.y}]</p>`;
  })
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`http://localhost:5000/api/search?query=${query}`);
      const data = await response.json();
      console.log(data.d[0]);
      setResults(data.d);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  return (
    <div>
      <h1>Movie and Actor Search</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Enter movie or actor name"
        />
        <button type="submit">Search</button>
      </form>
      {results && (
        <div>
          {showResult(results)}
        </div>
      )}
    </div>
  );
};

export default App;

