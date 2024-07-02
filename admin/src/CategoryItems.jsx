import React, { useState, useEffect } from 'react';
import './styles/CategoryItems.css'; // Импортируем стили

const CategoryItems = () => {
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [newCategoryName, setNewCategoryName] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:8080/categories');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setCategories(data); 
     
      } catch (error) {
        console.error('Error:', error);
      }
    };
    fetchData();
  }, []); 

  const handleUpdateCategory = async (categoryId) => {
    try {
      const response = await fetch(`http://localhost:8080/categories/${categoryId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name: newCategoryName }),
      });
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const updatedCategory = await response.json();
      setCategories(categories.map(category => 
        category._id === categoryId ? updatedCategory : category
      ));
      setNewCategoryName('');
      setSelectedCategory(null);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleDeleteCategory = async (categoryId) => {
    try {
      const response = await fetch(`http://localhost:8080/categories/${categoryId}`, {
        method: 'DELETE',
      });
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      setCategories(categories.filter(category => category._id !== categoryId));
    } catch (error) {
      console.error('Error:', error);
    }
  };


  return (
    <div className="category-items-container">
      <h2>Категории:</h2>
      <table>
        <thead>
          <tr>
            <th>Название</th>
            <th>Действие</th>
          </tr>
        </thead>
        <tbody>
          {categories.map(category => (
            <tr key={category._id}>
              <td>
                {selectedCategory === category._id ? (
                  <input 
                    type="text" 
                    value={newCategoryName} 
                    onChange={(e) => setNewCategoryName(e.target.value)} 
                  />
                ) : (
                  category.name
                )}
              </td>
              <td>
                {selectedCategory === category._id ? (
                  <button onClick={() => handleUpdateCategory(category._id)}>Сохранить</button>
                ) : (
                  <>
                    <button onClick={() => setSelectedCategory(category._id)}>Изменить</button>
                    <button onClick={() => handleDeleteCategory(category._id)}>Удалить</button>
                  </>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CategoryItems;
