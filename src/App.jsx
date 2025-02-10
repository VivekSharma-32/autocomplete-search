import React, { useEffect, useState } from "react";
import "./App.css";
const App = () => {
  const [input, setInput] = useState("");
  const [results, setResults] = useState([]);
  const [showResults, setShowResults] = useState(false);
  const [cache, setCache] = useState({});

  const fetchData = async () => {
    if (cache[input]) {
      console.log("Cache Returned", input);

      setResults(cache[input]);
      return;
    }

    console.log("API call", input);
    const data = await fetch("https://dummyjson.com/recipes/search?q=" + input);
    const json = await data.json();
    setResults(json?.recipes);
    setCache((prev) => ({ ...prev, [input]: json?.recipes }));
  };

  useEffect(() => {
    const timer = setTimeout(() => fetchData(), 500);
    return () => {
      clearTimeout(timer);
    };
  }, [input]);

  return (
    <div className="app">
      <h1>Autocomplete Search Bar</h1>
      <div>
        <input
          className="search-input"
          type="text"
          placeholder="Search"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onFocus={() => setShowResults(true)}
          onBlur={() => setShowResults(false)}
        />
      </div>
      <div className="result-container">
        {showResults &&
          results?.map((r) => (
            <span className="result" key={r.id}>
              {r.name}
            </span>
          ))}
      </div>
    </div>
  );
};

export default App;
