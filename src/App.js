// App.js

import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import SideNavBar from './SideNavBar';
import PopulationGraph from './PopulationGraph';
import CryptoPrices from './CryptoPrices';
import Home from './Home';

function App() {
  return (
    <Router>
      <div className="App">
        
        <Routes>
          <Route path="/" exact element={<SideNavBar />} />
          <Route path="/population-graph" element={<PopulationGraph />} />
          <Route path="/usd" element={<CryptoPrices currency="USD" />} />
          <Route path="/euro" element={<CryptoPrices currency="EUR" />} />
          {/* Add more routes for other pages if needed */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
