import React, { useState, useEffect } from 'react';
import './styles/RestaurantForm.css'; // Импортируем стили

const RestaurantForm = () => {
  const [restaurantData, setRestaurantData] = useState({
    title: '',
    description: '',
    logo: null,
    banner: null,
    selectedDishes: [],
    selectedPreference: '',
    preferences: [],
    dishes: [],
    instagram: '',
    whatsapp: '',
    oClock: '',
    address: '',
    phoneNumber: '',
    promotions: [],
    tooures:''
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [dishesResponse, preferencesResponse] = await Promise.all([
          fetch('https://eatandplayv2.onrender.com/categories/dishes'),
          fetch('https://eatandplayv2.onrender.com/categories/preference')
        ]);

        if (!dishesResponse.ok || !preferencesResponse.ok) {
          throw new Error('Network response was not ok');
        }

        const dishes = await dishesResponse.json();
        const preferences = await preferencesResponse.json();

        setRestaurantData(prevState => ({
          ...prevState,
          dishes: dishes,
          preferences: preferences
        }));
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setRestaurantData({ ...restaurantData, [name]: value });
  };

  const handleDishSelection = (event) => {
    const selectedDishes = Array.from(event.target.options)
      .filter(option => option.selected)
      .map(option => option.value);
    setRestaurantData(prevState => ({ ...prevState, selectedDishes }));
  };

  const handlePreferenceSelection = (event) => {
    setRestaurantData(prevState => ({ ...prevState, selectedPreference: event.target.value }));
  };

  const handleFileInputChange = (event) => {
    const { name, files } = event.target;
    setRestaurantData(prevState => ({ ...prevState, [name]: files[0] }));
  };

  const handlePromotionInputChange = (event, index) => {
    const { name, value } = event.target;
    const promotions = [...restaurantData.promotions];
    promotions[index] = { ...promotions[index], [name]: value };
    setRestaurantData({ ...restaurantData, promotions });
  };

  const handlePromotionFileInputChange = (event, index) => {
    const { files } = event.target;
    const promotions = [...restaurantData.promotions];
    promotions[index] = { ...promotions[index], image: files[0] };
    setRestaurantData({ ...restaurantData, promotions });
  };

  const addPromotion = () => {
    setRestaurantData(prevState => ({
      ...prevState,
      promotions: [...prevState.promotions, { description: '', image: null }]
    }));
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
      formData.append('preferenceName', restaurantData.selectedPreference);
      formData.append('instagram', restaurantData.instagram);
      formData.append('whatsapp', restaurantData.whatsapp);
      formData.append('oClock', restaurantData.oClock);
      formData.append('address', restaurantData.address);
      formData.append('phoneNumber', restaurantData.phoneNumber);
      formData.append('promotions', JSON.stringify(restaurantData.promotions.map(({ description }) => ({ description }))));
      formData.append('tooures', restaurantData.tooures)
      restaurantData.promotions.forEach(({ image }, index) => {
        if (image) {
          formData.append(`promotionImages`, image);
        }
      });

      console.log('Отправляемые данные:', {
        title: restaurantData.title,
        description: restaurantData.description,
        logo: restaurantData.logo,
        banner: restaurantData.banner,
        selectedDishes: restaurantData.selectedDishes,
        selectedPreference: restaurantData.selectedPreference,
        instagram: restaurantData.instagram,
        whatsapp: restaurantData.whatsapp,
        oClock: restaurantData.oClock,
        address: restaurantData.address,
        phoneNumber: restaurantData.phoneNumber,
        promotions: restaurantData.promotions,
        tooures: restaurantData.tooures,

      });

      const response = await fetch('https://eatandplayv2.onrender.com/categories/restaurants', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      console.log('Ресторан успешно создан:', data);

      // Очистка формы после успешной отправки
      setRestaurantData({
        title: '',
        description: '',
        logo: null,
        banner: null,
        selectedDishes: [],
        selectedPreference: '',
        preferences: [],
        dishes: [],
        instagram: '',
        whatsapp: '',
        oClock: '',
        address: '',
        phoneNumber: '',
        promotions: [],
        tooures:''
      });

      alert('Ресторан успешно создан!');

    } catch (error) {
      console.error('Ошибка при создании ресторана:', error);
      alert('Произошла ошибка при создании ресторана. Пожалуйста, попробуйте еще раз.');
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
          Выбрать предпочтение:
          <select
            value={restaurantData.selectedPreference}
            onChange={handlePreferenceSelection}
            required
          >
            <option value="">Выберите предпочтение</option>
            {restaurantData.preferences.map(preference => (
              <option key={preference._id} value={preference._id}>{preference.preferenceName}</option>
            ))}
          </select>
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
        <label>
          Instagram:
          <input
            type="text"
            name="instagram"
            value={restaurantData.instagram}
            onChange={handleInputChange}
            required
          />
        </label>
        <label>
          WhatsApp:
          <input
            type="text"
            name="whatsapp"
            value={restaurantData.whatsapp}
            onChange={handleInputChange}
            required
          />
        </label>
        <label>
          Рабочие часы:
          <input
            type="text"
            name="oClock"
            value={restaurantData.oClock}
            onChange={handleInputChange}
            required
          />
        </label>
        <label>
          Адрес:
          <input
            type="text"
            name="address"
            value={restaurantData.address}
            onChange={handleInputChange}
            required
          />
        </label>
        <label>
          Номер телефона:
          <input
            type="text"
            name="phoneNumber"
            value={restaurantData.phoneNumber}
            onChange={handleInputChange}
            required
          />
        </label>
        <label>
          Создать тур:
          <input
            type="text"
            name="tooures"
            value={restaurantData.tooures}
            onChange={handleInputChange}
            required
          />
        </label>
        <div>
          <h3>Акции и скидки</h3>
          {restaurantData.promotions.map((promotion, index) => (
            <div key={index}>
              <label>
                Описание акции:
                <input
                  type="text"
                  name="description"
                  value={promotion.description}
                  onChange={(event) => handlePromotionInputChange(event, index)}
                  required
                />
              </label>
              <label>
                Изображение акции:
                <input
                  type="file"
                  onChange={(event) => handlePromotionFileInputChange(event, index)}
                  required
                />
              </label>
            </div>
          ))}
          <button type="button" onClick={addPromotion}>Добавить акцию</button>
        </div>
        <button type="submit">Создать ресторан</button>
      </form>
    </div>
  );
};

export default RestaurantForm;
