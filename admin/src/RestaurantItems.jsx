import React, { useState, useEffect } from 'react';

const RestaurantItems = () => {
  const [restaurants, setRestaurants] = useState([]);
  const [dishes, setDishes] = useState([]);
  const [newDish, setNewDish] = useState({ dishId: '', restaurantId: '' });
  const [selectedDishForDeletion, setSelectedDishForDeletion] = useState({ dishId: '', restaurantId: '' });
  const [preferences, setPreferences] = useState([]);
  const [newPreference, setNewPreference] = useState({ preferenceId: '', restaurantId: '' });
  const [selectedPreferenceForDeletion, setSelectedPreferenceForDeletion] = useState({ preferenceId: '', restaurantId: '' });

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

  useEffect(() => {
    const fetchDishes = async () => {
      try {
        const response = await fetch('http://localhost:8080/dishes');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setDishes(data);
      } catch (error) {
        console.error('Error fetching dishes:', error);
      }
    };

    fetchDishes();
  }, []);

  useEffect(() => {
    const fetchPreferences = async () => {
      try {
        const response = await fetch('http://localhost:8080/preference');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setPreferences(data);
      } catch (error) {
        console.error('Error fetching preferences:', error);
      }
    };

    fetchPreferences();
  }, []);

  const deleteRestaurant = async (id) => {
    try {
      const response = await fetch(`http://localhost:8080/restaurants/${id}`, {
        method: 'DELETE',
      });
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      setRestaurants(restaurants.filter(restaurant => restaurant._id !== id));
    } catch (error) {
      console.error('Error deleting restaurant:', error);
    }
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setNewDish({ ...newDish, [name]: value });
  };

  const handleDishDeletionChange = (event, restaurantId) => {
    setSelectedDishForDeletion({ dishId: event.target.value, restaurantId });
  };

  const deleteDish = async () => {
    if (!selectedDishForDeletion.dishId || !selectedDishForDeletion.restaurantId) return;
    try {
      const response = await fetch(`http://localhost:8080/restaurants/${selectedDishForDeletion.restaurantId}/dishes/${selectedDishForDeletion.dishId}`, {
        method: 'DELETE',
      });
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const updatedRestaurants = await fetch('http://localhost:8080/restaurants').then(res => res.json());
      setRestaurants(updatedRestaurants);
      setSelectedDishForDeletion({ dishId: '', restaurantId: '' }); 
    } catch (error) {
      console.error('Error deleting dish:', error);
    }
  };

  const handleAddDish = async (event, restaurantId) => {
    event.preventDefault();
    try {
      const response = await fetch(`http://localhost:8080/restaurants/${restaurantId}/dishes`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ dishId: newDish.dishId }),
      });
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const updatedRestaurant = await response.json();
      setRestaurants(restaurants.map(restaurant =>
        restaurant._id === updatedRestaurant._id ? updatedRestaurant : restaurant
      ));
      setNewDish({ dishId: '', restaurantId: '' });
    } catch (error) {
      console.error('Error adding dish:', error);
    }
  };

  const handleAddPreference = async (event, restaurantId) => {
    event.preventDefault();
    try {
      const response = await fetch(`http://localhost:8080/restaurants/${restaurantId}/preferences`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ preferenceId: newPreference.preferenceId }),
      });
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const updatedRestaurant = await response.json();
      setRestaurants(restaurants.map(restaurant =>
        restaurant._id === updatedRestaurant._id ? updatedRestaurant : restaurant
      ));
      setNewPreference({ preferenceId: '', restaurantId: '' });
    } catch (error) {
      console.error('Error adding preference:', error);
    }
  };

  const handlePreferenceDeletionChange = (event, restaurantId) => {
    setSelectedPreferenceForDeletion({ preferenceId: event.target.value, restaurantId });
  };

  const deletePreference = async () => {
    if (!selectedPreferenceForDeletion.preferenceId || !selectedPreferenceForDeletion.restaurantId) return;
    try {
      const response = await fetch(`http://localhost:8080/restaurants/${selectedPreferenceForDeletion.restaurantId}/preferences/${selectedPreferenceForDeletion.preferenceId}`, {
        method: 'DELETE',
      });
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const updatedRestaurants = await fetch('http://localhost:8080/restaurants').then(res => res.json());
      setRestaurants(updatedRestaurants);
      setSelectedPreferenceForDeletion({ preferenceId: '', restaurantId: '' });
    } catch (error) {
      console.error('Error deleting preference:', error);
    }
  };

  const handlePreferenceChange = (event) => {
    const { name, value } = event.target;
    setNewPreference({ ...newPreference, [name]: value });
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
              <td><img src={restaurant.logo} alt="Логотип ресторана" style={{ maxWidth: '100px' }} /></td>
              <td><img src={restaurant.banner} alt="Баннер ресторана" style={{ maxWidth: '100px' }} /></td>
              <td>
                <form onSubmit={(event) => handleAddDish(event, restaurant._id)}>
                  <select name="dishId" value={newDish.dishId} onChange={handleInputChange} required>
                    <option value="">Выберите блюдо</option>
                    {dishes.map(dish => (<option key={dish._id} value={dish._id}>{dish.title}</option>))}
                  </select>
                  <button type="submit">Добавить блюдо</button>
                </form>
                <select onChange={(event) => handleDishDeletionChange(event, restaurant._id)} value={selectedDishForDeletion.dishId}>
                  <option value="">Выберите блюдо для удаления</option>
                  {restaurant.dishes.map(dish => (<option key={dish._id} value={dish._id}>{dish.title}</option>))}
                </select>
                <button onClick={deleteDish}>Удалить блюдо</button>
                <br/>
                <form onSubmit={(event) => handleAddPreference(event, restaurant._id)}>
                  <select name="preferenceId" value={newPreference.preferenceId} onChange={handlePreferenceChange} required>
                    <option value="">Выберите предпочтение для добавления</option>
                    {preferences.map(preference => (
                      <option key={preference._id} value={preference._id}>{preference.preferenceName}</option>
                    ))}
                  </select>
                  <button type="submit">Добавить предпочтение</button>
                </form>
                <select onChange={(event) => handlePreferenceDeletionChange(event, restaurant._id)} value={selectedPreferenceForDeletion.preferenceId}>
                  <option value="">Выберите предпочтение для удаления</option>
                  {restaurant.preferences.map(preference => (<option key={preference._id} value={preference._id}>{preference.preferenceName}</option>))}
                </select>
                <button onClick={deletePreference}>Удалить предпочтение</button>
              </td>
              <td><button onClick={() => deleteRestaurant(restaurant._id)}>Удалить</button></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default RestaurantItems;
