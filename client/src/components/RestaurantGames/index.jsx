import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import Modal from 'react-modal';
import { useRestaurants } from '../../Context/APIcontext';
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

  useEffect(() => {
    getFetchDataRestaurant(id);
    window.scrollTo(0, 0);
  }, [id, getFetchDataRestaurant]);

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

      <div className='title_menu'>
        <h1>Игры</h1>
        <h1>{restaurant.title}</h1>
      </div>

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
        <button onClick={closeQuizAppModal} className="modal-button">Закрыть</button>
        <div className="modal-iframe">
          <QuizApp />
        </div>
      </Modal>

      <Link style={{ textDecoration: "none" }} to={`/restaurant/${restaurant._id}/`}>
        <div className='btn-backto-page'>
          Назад
        </div>
      </Link>
      <footer>
        <Footer />
      </footer>
    </div>
  );
}

export default RestaurantGames;



