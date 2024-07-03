import React, { useState, useEffect } from 'react';
import './RestaurantDetail.css';
import { useParams, Link } from 'react-router-dom';
import { useRestaurants } from '../../Context/APIcontext';
import phone from '../../assets/phone1.png';
import phonesecond from '../../assets/phone2.png';
import image1 from '../../assets/image1.png';
import pasta from '../../assets/pastavtrlke.png';
import timeclock from '../../assets/time.png';
import Vector14 from '../../assets/Vector14.png';
import location from '../../assets/location.png';
import whatsapp from '../../assets/whatsapp.png';
import instagram from '../../assets/instagram.png';
import Footer from '../Footer'

const RestaurantDetail = () => {
  const { id } = useParams();
  const { restaurant, getFetchDataRestaurant } = useRestaurants();
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    getFetchDataRestaurant(id);
    window.scrollTo(0, 0);
  }, [id, getFetchDataRestaurant]);

  if (!restaurant) {
    return <div>Загрузка!</div>;
  }

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <div className='restaurant-detail'>
      <header>
        <div className='header-content'>
          <div className='left-item'>
            <div className='header_logo'>
              <img src={restaurant.logo} alt={`${restaurant.title}`} />
            </div>
            <div className='info-block'>
              <img src={timeclock} alt='time' /> {restaurant.oClock}
            </div>
          </div>
          <div className='right-item'>
            <div className='burger-menu' onClick={toggleMenu}>
              <img src={Vector14} alt="Меню" />
            </div>
          </div>
        </div>
      </header>
      <main>
        <div className={`mobile-nav ${menuOpen ? 'open' : ''}`}>
          <div className='burger-nav-header'>
            <Link style={{ textDecoration: "none" }} to={`/my-orders/${id}`} onClick={toggleMenu}><span className='my-order-item'>Мой заказ</span></Link>
            <div onClick={toggleMenu} className='nav-header-item'><img src={Vector14} alt="Меню" /></div>
          </div>
          <Link to={`/restaurant/${id}/menu`} onClick={toggleMenu}>Меню</Link>
          <Link to={`/games/${id}`} onClick={toggleMenu}>Игры на компанию</Link>
          <Link to={`/promotions/${id}`} onClick={toggleMenu}>Акции и скидки</Link>
          <Link to={`/tooures/${id}`} onClick={toggleMenu}>ЗD тур</Link>
          <Link to={`/`} onClick={toggleMenu}>На главную</Link>
          <div className='social-networks '>
            <div className='phone-number'>{restaurant.phoneNumber}</div>
            <div className='d0flex'>
              <span><a href={restaurant.instagram}><img src={instagram} alt="" /></a></span>
              <span><a href={restaurant.whatsapp}><img src={whatsapp} alt="" /></a></span>
            </div>
            <div className='flex-align'><img src={location} alt="" />{restaurant.address}</div>
            <div className='flex-align'><img src={timeclock} alt="" />{restaurant.oClock}</div>
          </div>
        </div>

        <div className='banner-restaurant'>
          <img src={restaurant.banner} alt={`${restaurant.title} banner`} />
          <div className='banner-text'>
            <h1>{restaurant.title}</h1>
            <p>{restaurant.description}</p>
          </div>
        </div>
        <div className='items_block'>
          <Link to={`/restaurant/${id}/menu`}><div className='item_block'><span>Меню</span><img src={pasta} alt="pasta" /></div></Link>
          <Link to={`/games/${id}`}><div className='item_block'><span>Игры на компанию</span><img src={phone} alt="phone" /></div></Link>
          <Link to={`/promotions/${id}`}><div className='item_block'><span>Акции и скидки</span><img src={phonesecond} alt="phone" /></div></Link>
          <a href={restaurant.tooures} target="_blank" rel="noopener noreferrer">
            <div className='item_block'>
              <span>ЗD тур</span>
              <img src={image1} alt="phone" />
            </div>
          </a>        </div>
      </main>

      <footer>
        <Footer />
      </footer>
    </div>
  );
};

export default RestaurantDetail;
