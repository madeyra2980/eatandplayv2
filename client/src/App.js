import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Institution from './components/Institution';
import { RestaurantsProvider } from '../src/Context/APIcontext';
import RestaurantDetail from './components/RestaurantDetail';
import MainPage from './components/MainPage';

const App = () => {
  return (
    <RestaurantsProvider>
    <Router>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/restaurants" element={<Institution />} />
        <Route path="/restaurant/:id" element={<RestaurantDetail />} />
      </Routes>
    </Router>
    </RestaurantsProvider>

  );
};

export default App;
