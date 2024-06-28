  import React, { useState, useEffect } from 'react';
  import { useParams, Link } from 'react-router-dom';
  import { useRestaurants } from '../../Context/APIcontext';
  import { useOrders } from '../../Context/OrdersProvider';
  import timeclock from '../../assets/time.png';
  import location from '../../assets/location.png';
  import whatsapp from '../../assets/whatsapp.png';
  import instagram from '../../assets/instagram.png';
  import heartVector from '../../assets/Vector.png';
  import heartIconBtn from '../../assets/hearticonbtn.png';
  import './RestaurantMenu.css';

  const RestaurantMenu = () => {
    const { id } = useParams();
    const { restaurant, loading, error, getFetchDataRestaurant } = useRestaurants();
    const { orders, toggleFavorite } = useOrders();
    const [modalVisible, setModalVisible] = useState(false);
    const [modalContent, setModalContent] = useState({ title: '', description: '', image: '', price: '' });

    useEffect(() => {
      console.log('Fetching restaurant data...');
      getFetchDataRestaurant(id);
    }, [id, getFetchDataRestaurant]);

    const showModal = (title, description, image, price) => {
      setModalContent({ title, description, image, price });
      setModalVisible(true);
    };

    const hideModal = () => {
      setModalVisible(false);
      setModalContent({ title: '', description: '', image: '', price: '' });
    };

    const handleAddToOrder = (menuItem) => {
      toggleFavorite(menuItem);
    };

    const isFavorite = (menuItem) => {
      return orders.some(order => order._id === menuItem._id);
    };

    if (loading) {
      return <div>Loading...</div>;
    }

    if (error) {
      return <div>Error: {error}</div>;
    }

    if (!restaurant) {
      return <div>No restaurant data</div>;
    }

    return (
      <>
        <header>
          <Link to={`/restaurant/${restaurant._id}`}>Назад</Link>
            <>
              <div className='header_logo'>
                <img src={restaurant.logo} alt={`${restaurant.title}`} />
              </div>
              <div className='info-block'><img src={timeclock} alt='time' /> 12:00-01:00</div>
              <div className='info-block'><img src={location} alt='location' /> БЦ «ERTIS», Абая 99B, 3 этаж</div>
              <div className='info-block info-block-green'><span>Позвонить</span></div>
              <div><img src={whatsapp} alt='whatsapp' /></div>
              <div><img src={instagram} alt='instagram' /></div>
              <div className='my-orders'>
                <Link to={`/my-orders/${restaurant._id}`}>Мой заказ <img src={heartVector} alt='heart' /></Link>
              </div>
            </>
        </header>

        <div className='title_menu'>
          <h1>Меню</h1>
          <h1>{restaurant.title}</h1>
        </div>

        <div className='restaurant-menu'>
          {restaurant.dishes.map((menuItem, index) => (
            <div key={index} className='card_menu'>
              <div className='menu-item-image'>
                <img src={menuItem.image} alt={menuItem.title} />
              </div>
              <div className='menu-item'>
                <div className='left_item_menu'>
                  <h3>{menuItem.title}</h3>
                  <button 
                    className='like-btn' 
                    onClick={() => handleAddToOrder(menuItem)}>
                    <img src={isFavorite(menuItem) ? heartIconBtn : heartVector} alt="Like" />
                  </button>
                </div>
                <div className='right_item_menu'>
                  <p>{menuItem.price}ТГ</p>
                  <div className='detail_menu'>
                    <button onClick={() => showModal(menuItem.title, menuItem.description, menuItem.image, menuItem.price)}>Подробнее</button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {modalVisible && (
          <div className='modals'>
            <div className='modal-contents'>
              <span className='close' onClick={hideModal}>&times;</span>
              <img src={modalContent.image} alt="Dish" />
              <h1>{modalContent.title}</h1>
              <p>{modalContent.description}</p>
              <p className='modal_price'>{modalContent.price}тг</p>
            </div>
          </div>
        )}
      </>
    );
  };

  export default RestaurantMenu;
