import React, { useEffect } from 'react';
import './RestaurantDetail.css';
import { useParams, Link } from 'react-router-dom';
import { useRestaurants } from '../../Context/APIcontext';
import phone from '../../assets/phone1.png';
import phonesecond from '../../assets/phone2.png';
import image1 from '../../assets/image1.png';
import pasta from '../../assets/pastavtrlke.png';
import Footer from '../Footer';
import timeclock from '../../assets/time.png';
import location from '../../assets/location.png';
import whatsapp from '../../assets/whatsapp.png';
import instagram from '../../assets/instagram.png';
import heartVector from '../../assets/Vector.png';

const RestaurantDetail = () => {
  const { id } = useParams();
  const { restaurant, getFetchDataRestaurant } = useRestaurants();

  useEffect(() => {
    getFetchDataRestaurant(id);
  }, [id, getFetchDataRestaurant]);

  if (!restaurant) {
    return <div>Загрузка!</div>;
  }

  return (
    <div className='restaurant-detail'>
     <header>
        <div className='header-content'>
        <Link to={`/`}>Назад</Link>
          <div className='header_logo'>
            <img src={restaurant.logo} alt={`${restaurant.title}`} />
          </div>
          <div className='info-block'><img src={timeclock} alt='time' /> {restaurant.oClock}</div>
          <div className='info-block'><img src={location} alt='location' /> {restaurant.address}</div>
          <div className='info-block info-block-green'><span>{restaurant.phoneNumber}</span></div>
          <div><a href={restaurant.whatsapp}><img src={whatsapp} alt='whatsapp' /></a></div>
          <div><a href={restaurant.instagram}><img src={instagram} alt='instagram' /></a></div>
        </div>
        <div className='my-orders'>
            <Link to={`/my-orders/${restaurant._id}`} className="my-orders-link">Мой заказ</Link>
            <img src={heartVector} alt='heart' className="heart-icon" />
          </div>
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
          </>
        )}

        <div className='items_block'>
          <Link to={`/restaurant/${id}/menu`}><div className='item_block'>Меню <img src={pasta} alt="" /> </div></Link>
          <Link to={`/games/${id}`}><div className='item_block'>Игры на компанию<img src={phone} alt="" /></div></Link>
          <Link><div className='item_block'>Акции и скидки <img src={phonesecond} alt="" /> </div></Link>
          <Link><div className='item_block'>ЗD тур<img src={image1} alt="" /></div></Link>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default RestaurantDetail;
