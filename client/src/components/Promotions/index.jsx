import React, { useState, useEffect, useRef } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useRestaurants } from '../../Context/APIcontext.tsx';
import './Promotions.css'; 
import Vector14 from '../../assets/Vector14.png'; 
import backbtn from '../../assets/backbutton.png'

const Promotions = () => {
  const { id } = useParams();
  const { restaurant, loading, getFetchDataRestaurant } = useRestaurants();
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
          <Link to={`/restaurant/${id}/`}><img src={backbtn} alt="" /></Link>
          </div>

          <div className='right-item'>
            <div className='burger-menu' onClick={toggleMenu}>
              <img src={Vector14} alt="Меню" />
            </div>
          </div>
        </div>
      </header>

      
      <div className={`mobile-nav ${menuOpen ? 'open' : ''}`} ref={menuRef}>
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
        <h1>Акции и Скидки</h1>
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
 
    </div>
  );
}

export default Promotions;
