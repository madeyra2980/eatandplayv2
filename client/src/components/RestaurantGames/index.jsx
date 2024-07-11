import React, { useState, useEffect, useRef } from 'react';
import { useParams, Link } from 'react-router-dom';
import Modal from 'react-modal';
import { useRestaurants } from '../../Context/APIcontext.tsx';
import timeclock from '../../assets/time.png';
import location from '../../assets/location.png';
import whatsapp from '../../assets/whatsapp.png';
import instagram from '../../assets/instagram.png';
import heartVector from '../../assets/Vector.png';
import Bottle from '../../assets/bottle.png';
import './RestaurantGames.css';
import Bootle from '../Games/Bootle';
import QuizApp from '../Games/QuizApp';
import Vector14 from '../../assets/Vector14.png';
import Footer from '../Footer'

Modal.setAppElement('#root');

const RestaurantGames = () => {
  const { id } = useParams();
  const { restaurant, loading, getFetchDataRestaurant } = useRestaurants();
  const [isBootleModalOpen, setBootleModalOpen] = useState(false);
  const [isQuizAppModalOpen, setQuizAppModalOpen] = useState(false);
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

  const openBootleModal = () => {
    setBootleModalOpen(true);
  };

  const closeBootleModal = () => {
    setBootleModalOpen(false);
  };

  const openQuizAppModal = () => {
    setQuizAppModalOpen(true);
  };

  const closeQuizAppModal = () => {
    setQuizAppModalOpen(false);
  };

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  if (loading) {
    return <div>Загрузка</div>;
  }

  return (
    <div className='games'>
      <header>
        <div className='header-content'>
          <div className='left-item'>
 
          </div>
        <h1>{restaurant.title}</h1>

          <div className='right-item'>
            <div className='burger-menu' onClick={toggleMenu}>
              <img src={Vector14} alt="Меню" />
            </div>
          </div>
        </div>
      </header>

      <div className='title_menu'>
        <h1>Игры</h1>
      </div>

      <div className={`mobile-nav ${menuOpen ? 'open' : ''}`} ref={menuRef}>
        <div className='burger-nav-header'>
          <Link style={{ textDecoration: "none" }} to={`/my-orders/${id}`} onClick={toggleMenu}><span className='my-order-item'>Мой заказ</span></Link>
          <div onClick={toggleMenu} className='nav-header-item'><img src={Vector14} alt="Меню" /></div>
        </div>
        <Link to={`/restaurant/${id}/menu`} onClick={toggleMenu}>Меню</Link>
        <Link to={`/games/${id}`} onClick={toggleMenu}>Игры на компанию</Link>
        <Link to={`/promotions/${id}`} onClick={toggleMenu}>Акции и скидки</Link>
        <Link to={`/tooures/${id}`} onClick={toggleMenu}>ЗD тур</Link>
        <Link to={`/`} onClick={toggleMenu}>На главную</Link>

      </div>
      <div className='restaurant-games'>
        <div className='card_menu_game' onClick={openBootleModal}>
          <img src={Bottle} alt="" />
          <p>Игра какая то</p>
        </div>
        <div className='card_menu_game' onClick={openQuizAppModal}>
          <img src={Bottle} alt="" />
          <p>Игра какая то</p>
        </div>
        
      </div>
      <Modal
        isOpen={isBootleModalOpen}
        onRequestClose={closeBootleModal}
        className="modal-content"
        overlayClassName="modal-overlay"
      >
        <button onClick={closeBootleModal} className="modal-button">Закрыть</button>
        <div className="modal-iframe">
          <Bootle />
        </div>
      </Modal>
      <Modal
        isOpen={isQuizAppModalOpen}
        onRequestClose={closeQuizAppModal}
        className="modal-content"
        overlayClassName="modal-overlay"
      >
        <button onClick={closeQuizAppModal} className="modal-button" >Закрыть</button>
        <div className="modal-iframe">
          <QuizApp />
        </div>
      </Modal>

      <Link style={{ textDecoration: "none" }} to={`/restaurant/${restaurant._id}/`}>
        <div className='btn-backto-page'>
          Назад
        </div>
      </Link>

    </div>
  );
}

export default RestaurantGames;



