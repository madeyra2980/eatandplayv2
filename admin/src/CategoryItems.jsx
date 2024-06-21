import React, { useState, useEffect } from 'react';
import './styles/CategoryItems.css'; // Импортируем стили

const CategoryItems = () => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:8080/categories');
        
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        const data = await response.json();
        setCategories(data); // Set categories state with the fetched data
      } catch (error) {
        console.error('Error:', error);
      }
    };

    fetchData();
  }, []); 

  return (
    <div className="category-items-container">
      <h2>Категории:</h2>
      <table>
        <thead>
          <tr>
            <th>Название</th>
          </tr>
        </thead>
        <tbody>
          {categories.map(category => (
            <tr key={category._id}>
              <td>{category.name}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CategoryItems;
