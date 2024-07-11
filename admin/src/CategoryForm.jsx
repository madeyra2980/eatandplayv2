import React, { useState } from 'react';
import './styles/CategoryForm.css'; // Импортируем стили

const CategoryForm = () => {
  const [inputValue, setInputValue] = useState('');
  const [statusMessage, setStatusMessage] = useState('');

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleSendForm = async (event) => {
    event.preventDefault(); // Предотвращаем перезагрузку страницы

    try {
      const response = await fetch('http://185.4.180.214/4444/categories', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name: inputValue }) , 
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      console.log('Success:', data);
      setStatusMessage('Категория успешно добавлена!');
      setInputValue('');

    } catch (error) {
      console.error('Error:', error);
      setStatusMessage('Ошибка при добавлении категории.');
    }
  };

  return (
    <div className="category-form-container">
      <form onSubmit={handleSendForm}>
        <input 
          type="text" 
          value={inputValue} 
          onChange={handleInputChange} 
          placeholder="Введите название категории" 
          name="name"
          required
        />
        <button type="submit">ДОБАВИТЬ КАТЕГОРИЮ</button>
      </form>
      {statusMessage && <p className="status-message">{statusMessage}</p>}
    </div>
  );
};

export default CategoryForm;
