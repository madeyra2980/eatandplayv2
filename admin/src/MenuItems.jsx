import React, { useState, useEffect } from 'react';

const MenuItems = () => {
  const [menuItems, setMenuItems] = useState([]);
  const [categories, setCategories] = useState([]);
  const [editingItemId, setEditingItemId] = useState(null); 
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    dishes: '',
  });



  useEffect(() => {
    const fetchMenuItems = async () => {
      try {
        const response = await fetch('http://185.4.180.214/4444/dishes');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setMenuItems(data);
      } catch (error) {
        console.error('Error fetching menu items:', error);
      }
    };

    const fetchCategories = async () => {
      try {
        const response = await fetch('http://185.4.180.214/4444/dishes/');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setCategories(data);
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };

    fetchMenuItems();
    fetchCategories();
  }, []);

  const handleEdit = (id) => {
    const restaurant = menuItems.find(item => item._id === id);
    if (restaurant) {
      setEditingItemId(id);
      setFormData({
        title: restaurant.title,
        description: restaurant.description,
        dishes: restaurant.dishes,
      });
    }
  };

  const updateMenuItem = async (id, updatedData) => {
    try {
      const response = await fetch(`http://185.4.180.214/4444/dishes/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedData),
      });
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
    // Обновляем состояние menuItems только после успешного запроса
    const updatedMenuItems = menuItems.map(item => {
      if (item._id === id) {
        return { ...item, ...updatedData };
      }
      return item;
    });
    setEditingItemId(null); // Завершаем редактирование после успешного обновления
      setMenuItems(updatedMenuItems);
    } catch (error) {
      console.error('Error updating menu item:', error);
    }
  };
  const deleteMenuItem = async (id) => {
    try {
      const response = await fetch(`http://185.4.180.214/4444/dishes/${id}`, {
        method: 'DELETE',
      });
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const updatedMenuItems = menuItems.filter(item => item._id !== id);
      setMenuItems(updatedMenuItems);
    } catch (error) {
      console.error('Error deleting menu item:', error);
    }
  };

  return (
    <div>
      <h2>Меню:</h2>
      <table border="1" cellPadding="5" cellSpacing="0" style={{ width: '100%', textAlign: 'left' }}>
        <thead>
          <tr>
            <th>Название блюда</th>
            <th>Описание</th>
            <th>Категория</th>
            <th>Цена</th>
            <th>Изображение</th>
            <th>Действия</th>
          </tr>
        </thead>
        <tbody>
          {menuItems.map(item => (
            <tr key={item._id}>
              <td>{item.title}</td>
              <td>{item.description}</td>
              <td>{item.category.name}</td>
              <td>{item.price} тенге</td>
              <td>
                <img src={item.image} alt={item.title} style={{ maxWidth: '100px' }} />
              </td>
              <td>
              {/* <button onClick={() => updateMenuItem(item._id, { title: 'Новое название', description: 'Новое описание' })}>
                 Редактировать
             </button>  */}
                <button onClick={() => deleteMenuItem(item._id)}>
                  Удалить
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default MenuItems;
