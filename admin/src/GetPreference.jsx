import React, { useState, useEffect } from 'react';
import './styles/CategoryItems.css'; 

const GetPreference = () => {
  const [preferences, setPreferences] = useState([]);
  const [selectedPreference, setSelectedPreference] = useState(null);
  const [newPreferenceName, setNewPreferenceName] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://185.4.180.214/preference');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setPreferences(data); 
      } catch (error) {
        console.error('Error:', error);
      }
    };
    fetchData();
  }, []); 

  const handleUpdatePreference = async (preferenceId) => {
    try {
      const response = await fetch(`http://185.4.180.214/preference/${preferenceId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ preferenceName: newPreferenceName }),
      });
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const updatedPreference = await response.json();
      setPreferences(preferences.map(preference => 
        preference._id === preferenceId ? updatedPreference : preference
      ));
      setNewPreferenceName('');
      setSelectedPreference(null);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleDeletePreference = async (preferenceId) => {
    try {
      const response = await fetch(`http://185.4.180.214/preference/${preferenceId}`, {
        method: 'DELETE',
      });
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      setPreferences(preferences.filter(preference => preference._id !== preferenceId));
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className="category-items-container">
      <h2>Предпочтения:</h2>
      <table>
        <thead>
          <tr>
            <th>Название</th>
            <th>Действие</th>
          </tr>
        </thead>
        <tbody>
          {preferences.map(preference => (
            <tr key={preference._id}>
              <td>
                {selectedPreference === preference._id ? (
                  <input 
                    type="text" 
                    value={newPreferenceName} 
                    onChange={(e) => setNewPreferenceName(e.target.value)} 
                  />
                ) : (
                  preference.preferenceName
                )}
              </td>
              <td>
                {selectedPreference === preference._id ? (
                  <button onClick={() => handleUpdatePreference(preference._id)}>Сохранить</button>
                ) : (
                  <>
                    <button onClick={() => setSelectedPreference(preference._id)}>Изменить</button>
                    <button onClick={() => handleDeletePreference(preference._id)}>Удалить</button>
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

export default GetPreference;
