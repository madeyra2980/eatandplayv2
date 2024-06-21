import React, { useState, useEffect } from 'react';
import './styles/RestaurantForm.css'; // Импортируем стили

const RestaurantForm = () => {
  const [restaurantData, setRestaurantData] = useState({
    title: '',
    description: '',
    logo: null,
    banner: null,
    selectedDishes: [],
    dishes: []
  });

  useEffect(() => {
    const fetchDishes = async () => {
      try {
        const response = await fetch('http://localhost:8080/dishes');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setRestaurantData(prevState => ({
          ...prevState,
          dishes: data
        }));
      } catch (error) {
        console.error('Error fetching dishes:', error);
      }
    };

    fetchDishes();
  }, []);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setRestaurantData({ ...restaurantData, [name]: value });
  };

  const handleDishSelection = (event) => {
    const { options } = event.target;
    const selectedDishes = Array.from(options)
      .filter(option => option.selected)
      .map(option => option.value);
    setRestaurantData({ ...restaurantData, selectedDishes });
  };

  const handleFileInputChange = (event) => {
    const { name, files } = event.target;
    setRestaurantData({ ...restaurantData, [name]: files[0] });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const formData = new FormData();
      formData.append('title', restaurantData.title);
      formData.append('description', restaurantData.description);
      formData.append('logo', restaurantData.logo);
      formData.append('banner', restaurantData.banner);
      restaurantData.selectedDishes.forEach(dishId => {
        formData.append('dishes', dishId);
      });

      const response = await fetch('http://localhost:8080/restaurants', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      console.log('Restaurant created successfully:', data);

      setRestaurantData({
        title: '',
        description: '',
        logo: null,
        banner: null,
        selectedDishes: [],
        dishes: restaurantData.dishes
      });

    } catch (error) {
      console.error('Error creating restaurant:', error);
    }
  };

  return (
    <div className="restaurant-form-container">
      <h2>Создать новый ресторан</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Название:
          <input
            type="text"
            name="title"
            value={restaurantData.title}
            onChange={handleInputChange}
            required
          />
        </label>
        <label>
          Описание:
          <textarea
            name="description"
            value={restaurantData.description}
            onChange={handleInputChange}
            required
          />
        </label>
        <label>
          Логотип:
          <input
            type="file"
            name="logo"
            onChange={handleFileInputChange}
            required
          />
        </label>
        <label>
          Баннер:
          <input
            type="file"
            name="banner"
            onChange={handleFileInputChange}
            required
          />
        </label>
        <label>
          Выбрать меню:
          <select
            multiple
            value={restaurantData.selectedDishes}
            onChange={handleDishSelection}
            style={{ height: '200px' }}
          >
            {restaurantData.dishes.map(dish => (
              <option key={dish._id} value={dish._id}>{dish.title}</option>
            ))}
          </select>
        </label>
        <button type="submit">Создать ресторан</button>
      </form>
    </div>
  );
};

export default RestaurantForm;
