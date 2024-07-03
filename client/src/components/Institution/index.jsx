import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useRestaurants } from '../../Context/APIcontext';
import './institution.css';
import Filter from '../../assets/filter.png';

const Institution = () => {
  const { restaurants, preferences, getFetchPreferences } = useRestaurants();
  const [selectedPreferences, setSelectedPreferences] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterPreferenceOpen, setFilterPreferenceOpen] = useState(false)
  console.log(filterPreferenceOpen); // Добавьте это в ваш компонент для отладки

  useEffect(() => {
    getFetchPreferences();
    window.scrollTo(0, 0);

  }, [getFetchPreferences]);

  const handlePreferenceChange = (event) => {
    const { value, checked } = event.target;
    if (checked) {
      setSelectedPreferences([...selectedPreferences, value]);
    } else {
      setSelectedPreferences(selectedPreferences.filter(pref => pref !== value));
    }
  };

  const handleSearchChange = (event) => setSearchTerm(event.target.value.toLowerCase());
  const openFilterPreference = () => setFilterPreferenceOpen(!filterPreferenceOpen)

  const filteredRestaurants = restaurants.filter(restaurant => {
    const matchesPreferences = selectedPreferences.length === 0 || selectedPreferences.every(pref => restaurant.preferences.some(p => p._id === pref));
    const matchesSearchTerm = restaurant.title.toLowerCase().includes(searchTerm);
    return matchesPreferences && matchesSearchTerm;
  });

  return (
    <div className='main_block_institutions'>
      <div className='filter_preference_title'>
      <span>Выбор заведений <img onClick={openFilterPreference} src={Filter} alt="" /></span>
      </div>
      <div className={`${filterPreferenceOpen ? "filter_preference" : "hidden"}`}>
      <p>Предпочтения</p>
        {preferences.map(preference => (
          <div key={preference._id}>
            <input
              type='checkbox'
              value={preference._id}
              id={preference._id}
              onChange={handlePreferenceChange}
            />
            <label htmlFor={preference._id}>{preference.preferenceName}</label>
          </div>
        ))}
       
      </div>
      <input
          type='text'
          placeholder='Поиск ресторана'
          value={searchTerm}
          onChange={handleSearchChange}
          className='search_input'
        />
        <div className='restaurant_card_item'>
        
        {filteredRestaurants.map((restaurant) => (
          <Link to={`/restaurant/${restaurant._id}`} key={restaurant._id} className='institution_card'>
            <div className='image_container'>
              <img src={restaurant.banner} alt={restaurant.title} className='institution_image' />
              <h1 className='title_restaurant'>{restaurant.title}</h1>
            </div>
          </Link>
        ))}
        </div>
      </div>
  );
};

export default Institution;
