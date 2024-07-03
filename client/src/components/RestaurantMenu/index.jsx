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
import Vector14 from '../../assets/Vector14.png';
import Filter from '../../assets/filter.png';
import Footer from '../Footer'

const RestaurantMenu = () => {
  const { id } = useParams();
  const { restaurant, loading, error, getFetchDataRestaurant } = useRestaurants();
  const { orders, toggleFavorite } = useOrders();
  const [modalVisible, setModalVisible] = useState(false);
  const [modalContent, setModalContent] = useState({ title: '', description: '', image: '', price: '' });
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [menuOpen, setMenuOpen] = useState(false);
  const [filterOpen, setFilterOpen] = useState(false);

  useEffect(() => {
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

  const handleCategoryChange = (event) => {
    const { value, checked } = event.target;
    if (checked) {
      setSelectedCategories([...selectedCategories, value]);
    } else {
      setSelectedCategories(selectedCategories.filter(cat => cat !== value));
    }
  };

  const filteredDishes = selectedCategories.length > 0
    ? restaurant?.dishes.filter(dish => selectedCategories.includes(dish.category._id))
    : restaurant?.dishes || [];

  if (loading) {
    return <div className="loading-container">Загрузка...</div>;
  }

  if (error) {
    return <div>Ошибка: {error}</div>;
  }

  if (!restaurant) {
    return <div>Нету ресторанов</div>;
  }

  const uniqueCategories = [...new Set(restaurant.dishes.map(dish => JSON.stringify(dish.category)))].map(category => JSON.parse(category));

  const toggleMenu = () => setMenuOpen(!menuOpen);
  const toggleFilter = () => {
    if (filterOpen) {
      setFilterOpen(false);
    } else {
      setFilterOpen(true);
    }
  };

  return (
    <>
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
      <div className='title_menu'>

        <h1>Меню</h1>
        <span onClick={toggleFilter} className='filter_item'>Фильтр <img src={Filter} alt="" /></span>
      </div>
      <div className={`filter_categories ${filterOpen ? 'filter_categoriesOpen' : 'filter_categoriesClose'}`}>
        {uniqueCategories.map(category => (
          <div key={category._id} className='category_item'>
            <input
              type='checkbox'
              value={category._id}
              id={category._id}
              onChange={handleCategoryChange}
              className='category_checkbox'
            />
            <label htmlFor={category._id} className='category_label'>{category.name}</label>
          </div>
        ))}
      </div>

      <div className='restaurant-menu'>
        {filteredDishes.map((menuItem, index) => (
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

      <Link style={{textDecoration:"none"}}  to={`/my-orders/${restaurant._id}`}>
      <div className='btn-backto-page'>
        Мои заказы
      </div>
      </Link>

      <footer>
        <Footer />
      </footer>
    </>
  );
};

export default RestaurantMenu;
