import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Institution from './components/Institution';
import { RestaurantsProvider } from '../src/Context/APIcontext';
import RestaurantDetail from './components/RestaurantDetail';
import MainPage from './components/MainPage';
import RestaurantMenu from './components/RestaurantMenu';
import MyOrders from './components/MyOrders';
import { OrdersProvider } from './Context/OrdersProvider';
import RestaurantGames from './components/RestaurantGames';

const App = () => {
  return (
    <OrdersProvider>
      <RestaurantsProvider>
        <Router>
          <Routes>
            <Route path="/" element={<MainPage />} />
            <Route path="/restaurants" element={<Institution />} />
            <Route path="/restaurant/:id" element={<RestaurantDetail />} />
            <Route path="/restaurant/:id/menu" element={<RestaurantMenu />} />
            <Route path="/games/:id" element={<RestaurantGames />} />
            <Route path="/my-orders/:id" element={<MyOrders />} />
        </Routes>
      </Router>
      </RestaurantsProvider>
    </OrdersProvider>
  );
};

export default App;
