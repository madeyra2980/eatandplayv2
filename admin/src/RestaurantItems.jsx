import React, { useState, useEffect } from 'react';

const RestaurantItems = () => {
  const [restaurants, setRestaurants] = useState([]);

  useEffect(() => {
    const fetchRestaurants = async () => {
      try {
        const response = await fetch('http://localhost:8080/restaurants'); 
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setRestaurants(data);
      } catch (error) {
        console.error('Error fetching restaurants:', error);
      }
    };

    fetchRestaurants();
  }, []);

  const deleteRestaurant = async (id) => {
    try {
      const response = await fetch(`http://localhost:8080/restaurants/${id}`, {
        method: 'DELETE',
      });
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      // Update the state to remove the deleted restaurant
      setRestaurants(restaurants.filter(restaurant => restaurant._id !== id));
    } catch (error) {
      console.error('Error deleting restaurant:', error);
    }
  };

  return (
    <div>
      <h2>Список ресторанов</h2>
      <table border="1" cellPadding="5" cellSpacing="0" style={{ width: '100%', textAlign: 'left' }}>
        <thead>
          <tr>
            <th>Название ресторана</th>
            <th>Описание</th>
            <th>Логотип</th>
            <th>Баннер</th>
            <th>Меню ресторана</th>
            <th>Удалить</th>
          </tr>
        </thead>
        <tbody>
          {restaurants.map(restaurant => (
            <tr key={restaurant._id}>
              <td>{restaurant.title}</td>
              <td>{restaurant.description}</td>
              <td>
                <img src={restaurant.logo} alt="Логотип ресторана" style={{ maxWidth: '100px' }} />
              </td>
              <td>
                <img src={restaurant.banner} alt="Баннер ресторана" style={{ maxWidth: '100px' }} />
              </td>
              <td>
                <ul>
                  {restaurant.dishes.map(dish => (
                    <li key={dish._id}>
                      {dish.title}
                    </li>
                  ))}
                </ul>
              </td>
              <td>
                <button onClick={() => deleteRestaurant(restaurant._id)}>Удалить</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default RestaurantItems;
