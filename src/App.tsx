import React from 'react';
// import logo from './logo.svg';
import './App.css';
// import BarChartData from './components/BarChart/BarChartData'
import { D3BarGraph } from './components/StackedBarChart/BarChart1';

function App() {
  return (
    <div className="App">
      {/* <BarChartData /> */}
      <D3BarGraph />
    </div>
  );
}

export default App;
