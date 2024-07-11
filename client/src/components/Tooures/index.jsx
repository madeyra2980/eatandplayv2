import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useRestaurants } from '../../Context/APIcontext.tsx';
import timeclock from '../../assets/time.png';
import location from '../../assets/location.png';
import whatsapp from '../../assets/whatsapp.png';
import instagram from '../../assets/instagram.png';
import heartVector from '../../assets/Vector.png';
import Vector14 from '../../assets/Vector14.png'; 
import Footer from '../Footer'

const Tour = () => {
  const { id } = useParams();
  const { restaurant, loading, getFetchDataRestaurant } = useRestaurants();
  const [menuOpen, setMenuOpen] = useState(false); 

  useEffect(() => {
    getFetchDataRestaurant(id);
  }, [id, getFetchDataRestaurant]);

  if (loading) {
    return <div>Загрузка</div>;
  }
  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };
  return (
    <div className='tour'>
       {/* <header>
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
      </header> */}

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
        </div>

      <div className='title_menu'>
        <h1>Тур</h1>
        <h1>{restaurant.title}</h1>
      </div>

      <div className='restaurant-tour'>
        <iframe src="https://www.google.com/maps/place/%D0%90%D0%94%D0%98%D0%A1/@50.4326989,80.2473158,3a,75y,91.96h,97t/data=!3m6!1e1!3m4!1sgd31JnvzUNxhPWHlvKOZcQ!2e0!7i16384!8i8192!4m9!3m8!1s0x42f2657010161b89:0xf465eb48ab41144f!5m2!4m1!1i2!8m2!3d50.4328478!4d80.2471481!16s%2Fg%2F11py817bxm?coh=205409&entry=ttu" title="Restaurant Tour" width="100%" height="600px"></iframe>
      </div>

      <Link style={{textDecoration:"none"}}  to={`/restaurant/${restaurant._id}/`}>
      <div className='btn-backto-page'>
      Назад     
       </div>
      </Link>


    </div>
  );
}

export default Tour;
