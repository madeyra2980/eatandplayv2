import React, { useEffect } from 'react';
import './RestaurantDetail.css';
import { useParams, Link } from 'react-router-dom';
import { useRestaurants } from '../../Context/APIcontext';
import timeclock from '../../assets/time.png';
import location from '../../assets/location.png';
import whatsapp from '../../assets/whatsapp.png';
import instagram from '../../assets/instagram.png';
import heartVector from '../../assets/Vector.png';

const RestaurantDetail = () => {
  const { id } = useParams();
  const { restaurant, loading, error, getFetchDataRestaurant } = useRestaurants();

  useEffect(() => {
    getFetchDataRestaurant(id);
  }, [id, getFetchDataRestaurant]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error loading restaurant data.</div>;
  }

  if (!restaurant) {
    return <div>No restaurant data found.</div>;
  }

  return (
    <div className='restaurant-detail'>
      <header>
        <Link to='/'>Назад</Link>
        {restaurant && (
          <>
            <img src={restaurant.logo} alt={`${restaurant.title} logo`} />
            <div className='info-block'><img src={timeclock} alt='time' /> 12:00-01:00</div>
            <div className='info-block'><img src={location} alt='location' /> БЦ «ERTIS», Абая 99B, 3 этаж</div>
            <div className='info-block info-block-green'><span>Позвонить</span></div>
            <div><img src={whatsapp} alt='whatsapp' /></div>
            <div><img src={instagram} alt='instagram' /></div>
            <div className='my-orders'> Мой заказ <img src={heartVector} alt='heart' /> </div>
          </>
        )}
      </header>

      <main>
        {restaurant && (
          <>
            <div className='banner-restaurant'>
              <img src={restaurant.banner} alt={`${restaurant.title} banner`} />
              <div className='banner-text'>
                <h1>{restaurant.title}</h1>
                <p>{restaurant.description}</p>
              </div>
            </div>
            <div>
              <h1>{restaurant.title}</h1>
              <p>{restaurant.description}</p>
            </div>
          </>
        )}
      </main>
    </div>
  );
};

export default RestaurantDetail;
