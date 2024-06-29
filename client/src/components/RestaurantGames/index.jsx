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

Modal.setAppElement('#root');

const RestaurantGames = () => {
  const { id } = useParams();
  const { restaurant, loading, getFetchDataRestaurant } = useRestaurants();
  const [isBootleModalOpen, setBootleModalOpen] = useState(false);
  const [isQuizAppModalOpen, setQuizAppModalOpen] = useState(false);

  useEffect(() => {
    getFetchDataRestaurant(id);
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

  if (loading) {
    return <div>Загрузка</div>;
  }

  return (
    <div className='games'>
      <header>
        <div className='header-content'>
        <Link to={`/restaurant/${restaurant._id}`}>Назад</Link>
          <div className='header_logo'>
            <img src={restaurant.logo} alt={`${restaurant.title}`} />
          </div>
          <div className='info-block'><img src={timeclock} alt='time' /> 12:00-01:00</div>
          <div className='info-block'><img src={location} alt='location' /> БЦ «ERTIS», Абая 99B, 3 этаж</div>
          <div className='info-block info-block-green'><span>Позвонить</span></div>
          <div><img src={whatsapp} alt='whatsapp' /></div>
          <div><img src={instagram} alt='instagram' /></div>
        </div>
        <div className='my-orders'>
            <Link to={`/my-orders/${restaurant._id}`} className="my-orders-link">Мой заказ</Link>
            <img src={heartVector} alt='heart' className="heart-icon" />
          </div>
      </header>

      <div className='title_menu'>
        <h1>Игры</h1>
        <h1>{restaurant.title}</h1>
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

    </div>
  );
}

export default RestaurantGames;



