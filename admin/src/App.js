import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import MenuForm from './SendMenuForm';
import MenuItems from './MenuItems';
import CategoryForm from './CategoryForm';
import CategoryItems from './CategoryItems';
import RestaurantForm from './RestaurantForm';
import RestaurantItems from './RestaurantItems';

import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <nav>
          <ul>
            <li>
              <Link to="/menu-form">Добавить меню</Link>
            </li>
            <li>
              <Link to="/category-form">Добавить категорий</Link>
            </li>
            <li>
              <Link to="/categories">Категорий</Link>
            </li>
            <li>
              <Link to="/restaurant-form">Добавить ресторан</Link>
            </li>
            <li>
              <Link to="/restaurants">Рестораны</Link>
            </li>
            <li>
              <Link to="/menu-items">Блюды</Link>
            </li>
          </ul>
        </nav>
        <Routes>
          <Route path="/menu-form" element={<MenuForm />} />
          <Route path="/category-form" element={<CategoryForm />} />
          <Route path="/categories" element={<CategoryItems />} />
          <Route path="/restaurant-form" element={<RestaurantForm />} />
          <Route path="/restaurants" element={<RestaurantItems />} />
          <Route path="/menu-items" element={<MenuItems />} />
          <Route path="/" element={<h2>Добро пожаловать в приложение для управления рестораном</h2>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
