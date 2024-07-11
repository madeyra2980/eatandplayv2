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
        <iframe src={restaurant.tooures} title="Restaurant Tour" width="100%" height="600px"></iframe>
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
