import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useOrders } from '../../Context/OrdersProvider';
import { useRestaurants } from '../../Context/APIcontext';
import timeclock from '../../assets/time.png';
import location from '../../assets/location.png';
import whatsapp from '../../assets/whatsapp.png';
import instagram from '../../assets/instagram.png';
import heartVector from '../../assets/Vector.png';
import heartIconBtn from '../../assets/hearticonbtn.png';
import Footer from '../Footer/'
import './MyOrders.css';
import Vector14 from '../../assets/Vector14.png'; 

const MyOrders = () => {
  const { orders, removeFromOrders, incrementOrderQuantity, decrementOrderQuantity, clearOrders } = useOrders();
  const { restaurant, loading, error, getFetchDataRestaurant } = useRestaurants();
  const { id } = useParams();
  const [modalVisible, setModalVisible] = useState(false);
  const [modalContent, setModalContent] = useState({ title: '', description: '', image: '', price: '' });
  const [totalSum, setTotalSum] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false); 

  useEffect(() => {
    if (id) {
      console.log('Загрузка данных ресторана для id:', id);
      getFetchDataRestaurant(id);
    }
  }, [id, getFetchDataRestaurant]);

  useEffect(() => {
    console.log('Обновление заказов:', orders);
    const total = orders.reduce((sum, order) => sum + order.price * order.quantity, 0);
    setTotalSum(total);
  }, [orders]);

  const isFavorite = (menuItem) => {
    return orders.some(order => order._id === menuItem._id);
  };

  const handleRemoveFromOrder = (menuItem) => {
    removeFromOrders(menuItem._id);
  };

  const showModal = (title, description, image, price) => {
    setModalContent({ title, description, image, price });
    setModalVisible(true);
  };

  const hideModal = () => {
    setModalVisible(false);
    setModalContent({ title: '', description: '', image: '', price: '' });
  };

  if (loading) {
    return <div>Загрузка...</div>;
  }

  if (error) {
    return <div>Ошибка: {error}</div>;
  }

  if (!restaurant) {
    console.log('Ресторан не найден');
    return <div>Данные ресторана отсутствуют</div>;
  }

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <div>
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
        <h1>Меню</h1>
        <h1>{restaurant.title}</h1>
      </div>

      <div className='orders-list'>
        <div className='restaurant-menu'>
          {orders.length > 0 ? (
            orders.map((order, index) => (
              <div key={index} className='card_menu'>
                <div className='menu-item-image'>
                  <img src={order.image} alt={order.title} />
                </div>
                <div className='menu-item'>
                  <div className='left_item_menu'>
                    <h3>{order.title}</h3>
                    <button
                      className='like-btn'
                      onClick={() => handleRemoveFromOrder(order)}>
                      <img src={isFavorite(order) ? heartIconBtn : heartVector} alt="Like" />
                    </button>
                  </div>
                  <div className='right_item_menu'>
                    <p>{order.price}ТГ</p>
                    <div className='detail_menu'>
                      <button onClick={() => showModal(order.title, order.description, order.image, order.price)}>Подробнее</button>
                    </div>
                  </div>
                </div>
                <div className='quantity-control'>
                  <button onClick={() => decrementOrderQuantity(order._id)}>-</button>
                  <span>{order.quantity}</span>
                  <button onClick={() => incrementOrderQuantity(order._id)}>+</button>
                </div>
              </div>
            ))
          ) : (
            <div>Корзина пуста</div>
          )}
        </div>
        {orders.length > 0 && (
          <button className='clear-orders' onClick={clearOrders}>Очистить корзину</button>
        )}
      </div>

      {orders.length > 0 && (
        <div className='sum_total_menu'>
          {orders.map(order => (
            <p key={order._id}>{order.title}.....................{order.price * order.quantity}ТГ</p>
          ))}
          <div className='total_price'>
            Итого: {totalSum}ТГ
          </div>
        </div>
      )}

      
<Link style={{textDecoration:"none"}}  to={`/restaurant/${restaurant._id}/menu`}>
      <div className='btn-backto-page'>
      Вернуться на страницу меню     
       </div>
      </Link>

<footer>
      <Footer/>
    </footer>
      {modalVisible && (
        <div className='modals'>
          <div className='modal-contents'>
            <span className='close' onClick={hideModal}>&times;</span>
            <img src={modalContent.image} alt="Dish" />
            <h1>{modalContent.title}</h1>
            <p>{modalContent.description}</p>
            <p className='modal_price'>{modalContent.price}ТГ</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyOrders;
