import React, { useState, useEffect } from 'react';
import './styles/MenuForm.css'; // Импортируем стили

const MenuForm = () => {
  const [inputValues, setInputValues] = useState({
    title: '',
    description: '',
    cookingTime: '',
    price: '',
    image: null,
    category: ''
  });
  const [categories, setCategories] = useState([]);
  const [statusMessage, setStatusMessage] = useState('');

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch('http://185.4.180.214:4444/categories');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setCategories(data);
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };

    fetchCategories();
  }, []);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setInputValues({
      ...inputValues,
      [name]: value
    });
  };

  const handleImageChange = (event) => {
    setInputValues({
      ...inputValues,
      image: event.target.files[0]
    });
  };

  const handleCategoryChange = (event) => {
    setInputValues({
      ...inputValues,
      category: event.target.value
    });
  };

  const handleSendForm = async (event) => {
    event.preventDefault();

    try {
      const formData = new FormData();
      formData.append('title', inputValues.title);
      formData.append('description', inputValues.description);
      formData.append('cookingTime', inputValues.cookingTime);
      formData.append('price', inputValues.price);
      formData.append('category', inputValues.category);
      formData.append('image', inputValues.image);

      const response = await fetch('http://185.4.180.214:4444/dishes', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      console.log('Success:', data);
      setStatusMessage('Блюдо успешно добавлено!');
      setInputValues({
        title: '',
        description: '',
        cookingTime: '',
        price: '',
        image: null,
        category: ''
      });
    } catch (error) {
      console.error('Error:', error);
      setStatusMessage('Ошибка при добавлении блюда.');
    }
  };

  return (
    <div className="menu-form-container">
      <form onSubmit={handleSendForm}>
        <input
          type="text"
          name="title"
          value={inputValues.title}
          onChange={handleInputChange}
          placeholder="Введите название блюда"
          required
        />
        <input
          type="text"
          name="description"
          value={inputValues.description}
          onChange={handleInputChange}
          placeholder="Введите описание блюда"
          required
        />
        <input
          type="number"
          name="cookingTime"
          value={inputValues.cookingTime}
          onChange={handleInputChange}
          placeholder="Введите время приготовления (в минутах)"
          required
        />
        <input
          type="number"
          name="price"
          value={inputValues.price}
          onChange={handleInputChange}
          placeholder="Введите цену"
          required
        />
        <input
          type="file"
          name="image"
          onChange={handleImageChange}
          required
        />
        <select
          name="category"
          value={inputValues.category}
          onChange={handleCategoryChange}
          required
        >
          <option value="">Выберите категорию</option>
          {categories.map(category => (
            <option key={category._id} value={category._id}>{category.name}</option>
          ))}
        </select>
        <button type="submit">Добавить блюдо</button>
      </form>
      {statusMessage && <p className="status-message">{statusMessage}</p>}
    </div>
  );
};

export default MenuForm;
