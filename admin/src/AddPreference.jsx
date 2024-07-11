import React, { useState } from 'react';
import './styles/CategoryForm.css'; 

const AddPreference = () => {
  const [inputValue, setInputValue] = useState('');
  const [statusMessage, setStatusMessage] = useState('');

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleSendForm = async (event) => {
    event.preventDefault(); 
  
    try {
      const response = await fetch('http://localhost:4444/preference', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ preferenceName: inputValue }),
      });
  
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
  
      const data = await response.json();
      console.log('Success:', data);
      setStatusMessage('Предпочтение успешно добавлено!');
      setInputValue('');
  
    } catch (error) {
      console.error('Error:', error);
      setStatusMessage('Ошибка при добавлении предпочтений.');
    }
  };
  
  

  return (
    <div className="category-form-container">
      <form onSubmit={handleSendForm}>
        <input 
          type="text" 
          value={inputValue} 
          onChange={handleInputChange} 
          placeholder="Введите название Предпочтений" 
          name="preferenceName"
          required
        />
        <button type="submit">ДОБАВИТЬ ПРЕДПОЧИТАНИЕ</button>
      </form>
      {statusMessage && <p className="status-message">{statusMessage}</p>}
    </div>
  );
};

export default AddPreference;
