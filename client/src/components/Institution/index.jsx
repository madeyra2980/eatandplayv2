import React from 'react';
import { Link } from 'react-router-dom';
import { useRestaurants } from '../../Context/APIcontext';
import './institution.css';

const Institution = () => {
  const { restaurants } = useRestaurants();

  return (
    <div className='main_block_institutions'>
      {restaurants.map((restaurant) => (
        <Link to={`/restaurant/${restaurant._id}`} key={restaurant._id} className='institution_card'>
          <img src={restaurant.banner} alt={restaurant.title} />
          <h1 className='title_restaurant'>{restaurant.title}</h1>
        </Link>
      ))}
    </div>
  );
};

export default Institution;
