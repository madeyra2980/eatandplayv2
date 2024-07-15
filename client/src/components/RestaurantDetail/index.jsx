import React, { useState, useEffect, useRef } from 'react';
import './RestaurantDetail.css';
import { useParams, Link } from 'react-router-dom';
import { useRestaurants } from '../../Context/APIcontext.tsx';
import phone from '../../assets/phone1.png';
import phonesecond from '../../assets/phone2.png';
import image1 from '../../assets/image1.png';
import pasta from '../../assets/pastavtrlke.png';
import timeclock from '../../assets/time.png';
import Vector14 from '../../assets/Vector14.png';
import location from '../../assets/location.png';
import whatsapp from '../../assets/whatsapp.png';
import instagram from '../../assets/instagram.png';

const RestaurantDetail = () => {
  const { id } = useParams();
  const { restaurant, getFetchDataRestaurant } = useRestaurants();
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef(null);

  useEffect(() => {
    getFetchDataRestaurant(id);
    window.scrollTo(0, 0);
  }, [id, getFetchDataRestaurant]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setMenuOpen(false);
      }
    };

    if (menuOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [menuOpen]);

  if (!restaurant) {
    return <div>Загрузка!</div>;
  }

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <div className='restaurant-detail'>
      <main>
        <div className={`mobile-nav ${menuOpen ? 'open' : ''}`} ref={menuRef}>
          <div className='burger-nav-header'>
            <Link style={{ textDecoration: 'none' }} to={`/my-orders/${id}`} onClick={toggleMenu}>
              <span className='my-order-item'>Мой заказ</span>
            </Link>
            <div onClick={toggleMenu} className='nav-header-item'>
              <img src={Vector14} alt="Меню" />
            </div>
          </div>
          <Link to={`/restaurant/${id}/menu`} onClick={toggleMenu}>Меню</Link>
          <Link to={`/games/${id}`} onClick={toggleMenu}>Игры на компанию</Link>
          <Link to={`/promotions/${id}`} onClick={toggleMenu}>Акции и скидки</Link>
          <Link to={`/tooures/${id}`} onClick={toggleMenu}>ЗD тур</Link>
          <Link to={`/`} onClick={toggleMenu}>На главную</Link>
          <div className='social-networks'></div>
        </div>

        <div className='banner-restaurant'>
          <img src={restaurant.banner} alt={`${restaurant.title} banner`} />
          <div className='banner-text'>
            <h1>{restaurant.title}</h1>
            <p>{restaurant.description}</p>
          </div>
        </div>
        <div className='burger-menu' onClick={toggleMenu}>
          <img src={Vector14} alt="Меню" />
        </div>

        <div className='contents-container'>
          <div className='locationItem'>
            <div className='card_location'><img src={timeclock} width={10} alt="" />{restaurant.oClock}</div>
            <div className='card_location'><img src={location} width={10} alt="" />{restaurant.address}</div>
          </div>
          {console.log(restaurant.address)}
          <div className='social-media-items'>
          <span className='card-media-items'> 
            <a className='xWhatsapp' href={restaurant.whatsapp}><img  width={20} src={whatsapp} alt="" /></a>
          </span>
          <span className='card-media-items-second'>
            <a href={restaurant.instagram} className='xinstagramm'><img width={20} src={instagram} alt="" /></a>
          </span>
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
          </a>
        </div>
      </main>
    </div>
  );
};

export default RestaurantDetail;
