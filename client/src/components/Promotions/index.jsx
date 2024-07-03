import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useRestaurants } from '../../Context/APIcontext';
import timeclock from '../../assets/time.png';
import location from '../../assets/location.png';
import whatsapp from '../../assets/whatsapp.png';
import instagram from '../../assets/instagram.png';
import heartVector from '../../assets/Vector.png';
import './Promotions.css'; 
import Vector14 from '../../assets/Vector14.png'; 
import Footer from '../Footer';

const Promotions = () => {
  const { id } = useParams();
  const { restaurant, loading, getFetchDataRestaurant } = useRestaurants();
  const [menuOpen, setMenuOpen] = useState(false); 

  useEffect(() => {
    getFetchDataRestaurant(id);
    window.scrollTo(0, 0);
  }, [id, getFetchDataRestaurant]);

  if (loading) {
    return <div>Загрузка...</div>;
  }

  if (!restaurant) {
    return <div>Нет данных о ресторане</div>;
  }
  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };
  return (
    <div className="promotions">
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
      
      <div className={`mobile-nav ${menuOpen ? 'open' : ''}`}>
          <div className='burger-nav-header'>
            <Link style={{textDecoration:"none"}} to={`/my-orders/${id}`} onClick={toggleMenu}><span className='my-order-item'>Мой заказ</span></Link>
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

      <div className='title_menu'>
        <h1>Акции и Скидки</h1>
        <h1>{restaurant.title}</h1>
      </div>

      <div className='promotions-cards'>
        {restaurant.promotions && restaurant.promotions.map((promotion, index) => (
          <div key={index} className='promotion-card'>
            <img src={promotion.image} alt="Discount" className='promotion-image' />
            
            <p className='promotion-text'>{promotion.description}</p>
          </div>
        ))}
      </div>
      <Link style={{textDecoration:"none"}}  to={`/restaurant/${restaurant._id}/`}>
      <div className='btn-backto-page'>
      Назад     
       </div>
      </Link>
        <footer>
      <Footer/>
      </footer>
    </div>
  );
}

export default Promotions;
