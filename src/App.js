import React, { useEffect, useState } from 'react';
import './App.css';

function useStats() {
  const [stats, setStats] = useState();
  useEffect(() => {
    async function fetchData() {
      console.log('Fetching data');
      const data = await fetch('https://covid19.mathdro.id/api/countries/GB').then(res => res.json());
      setStats(data);
    }
    fetchData();
  }, []);
  return stats;
}

function Stats() {
  const stats = useStats();
  if (!stats) return <p>Loading...</p>;
  var date = new Date(stats.lastUpdate);
  var lastUpdated = date.toUTCString();
  return (
  <div className="main-content">
    <h1 className="header">United Kingdom Covid-19 Tracker</h1>
    <div className="statBlock">
      <h3>Confirmed: </h3>
      <span>{stats.confirmed.value}</span>
    </div>
    <div className="statBlock">
      <h3>Deaths: </h3>
      <span>{stats.deaths.value}</span>
    </div>
    <div className="statBlock">
      <h3>Recovered: </h3>
      <span>{stats.recovered.value}</span>
    </div>
    <span>Stats last updated: {lastUpdated}</span>  
  </div>
  
  );
}

function App() {
  document.title = "UK Covid-19 Tracker";
  return (
    <div className="App">
      <Stats></Stats>
    </div>
  );
}

export default App;
