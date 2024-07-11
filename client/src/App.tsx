import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Institution from './components/Institution';
import { RestaurantsProvider } from '../src/Context/APIcontext.tsx';
import RestaurantDetail from './components/RestaurantDetail';
import MainPage from './components/MainPage';
import RestaurantMenu from './components/RestaurantMenu';
import MyOrders from './components/MyOrders/index.tsx';
import { OrdersProvider } from './Context/OrdersProvider.tsx';
import RestaurantGames from './components/RestaurantGames';
import Promotions from './components/Promotions';
import Tooures from './components/Tooures';
import Footer from './components/Footer/index.jsx';

const App:React.FC = () => {
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
            <Route path='/promotions/:id' element={<Promotions/>} />
        </Routes>
      </Router>
      <Footer/>
    </RestaurantsProvider>
  </OrdersProvider>

  );
};

export default App;
