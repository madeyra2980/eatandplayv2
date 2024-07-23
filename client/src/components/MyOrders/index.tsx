import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { useOrders } from "../../Context/OrdersProvider.tsx";
import { useRestaurants } from "../../Context/APIcontext.tsx";
import backbtn from '../../assets/backbutton.png'
import heartVector from "../../assets/Vector.png";
import heartIconBtn from "../../assets/hearticonbtn.png";
import "./MyOrders.css";
import line from '../../assets/line.png'
import Vector14 from "../../assets/Vector14.png";

const MyOrders = () => {
  const {
    orders,
    removeFromOrders,
    incrementOrderQuantity,
    decrementOrderQuantity,
    clearOrders,
  } = useOrders();
  const { restaurant, loading, error, getFetchDataRestaurant } =
    useRestaurants();
  const { id } = useParams();
  const [modalVisible, setModalVisible] = useState(false);
  const [modalContent, setModalContent] = useState({
    title: "",
    description: "",
    image: "",
    price: "",
  });
  const [totalSum, setTotalSum] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    if (id) {
      console.log("Загрузка данных ресторана для id:", id);
      getFetchDataRestaurant(id);
    }
    window.scrollTo(0, 0);
  }, [id, getFetchDataRestaurant]);

  useEffect(() => {
    console.log("Обновление заказов:", orders);
    const total = orders.reduce(
      (sum, order) => sum + order.price * order.quantity,
      0
    );
    setTotalSum(total);
  }, [orders]);

  const isFavorite = (menuItem) => {
    return orders.some((order) => order._id === menuItem._id);
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
    setModalContent({ title: "", description: "", image: "", price: "" });
  };

  if (loading) {
    return <div>Загрузка...</div>;
  }

  if (error) {
    return <div>Ошибка: {error}</div>;
  }

  if (!restaurant) {
    console.log("Ресторан не найден");
    return <div>Данные ресторана отсутствуют</div>;
  }

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <div>
      <header>
        <div className="header-content">
          <div className="left-item">
          <Link to={`/restaurant/${id}/menu`}><img src={backbtn} alt="" /></Link>
          </div>

          <div className="right-item">
            <div className="burger-menu" onClick={toggleMenu}>
              <img src={Vector14} alt="Меню" />
            </div>
          </div>
        </div>
      </header>

      <div className={`mobile-nav ${menuOpen ? "open" : ""}`}>
        <div className="burger-nav-header">
          <Link
            style={{ textDecoration: "none" }}
            to={`/my-orders/${id}`}
            onClick={toggleMenu}
          >
            <span className="my-order-item">Мой заказ</span>
          </Link>
          <div onClick={toggleMenu} className="nav-header-item">
            <img src={Vector14} alt="Меню" />
          </div>
        </div>
        <Link to={`/restaurant/${id}/menu`} onClick={toggleMenu}>
          Меню
        </Link>
        <Link to={`/games/${id}`} onClick={toggleMenu}>
          Игры на компанию
        </Link>
        <Link to={`/promotions/${id}`} onClick={toggleMenu}>
          Акции и скидки
        </Link>
        <Link to={`/tooures/${id}`} onClick={toggleMenu}>
          ЗD тур
        </Link>
        <Link to={`/restaurant/${id}`} onClick={toggleMenu}>На главную</Link>

       
      </div>

      <div className="title_menu">
        <h1>Меню</h1>
      </div>

      <div className="orders-list">
        <div className="restaurant-menu">
          {orders.length > 0 ? (
            orders.map((order, index) => (
              <div key={index} className="card_menu">
                <div className="menu-item-image">
                  <img src={order.image} alt={order.title} />
                </div>
                <div className="menu-item">
                  <div className="left_item_menu">
                    <h3>{order.title}</h3>
                  </div>
                    {/* <p className='description_item'>{order.description}</p> */}
                  <div className="detail_menu">
                  <button
                    style={{ fontSize: '9px' }} 
                    onClick={() =>
                      showModal(
                        order.title,
                        order.description,
                        order.image,
                        order.price
                      )
                    }
                  >
                    Подробнее
                  </button>
                </div>
                  <div className="bottom_card">
                    <p>{order.price}тг</p>
                    <div className="detail_menu">
                      <button
                        className="like-btn"
                        onClick={() => handleRemoveFromOrder(order)}
                      >
                        <img
                          src={isFavorite(order) ? heartIconBtn : heartVector}
                          alt="Like"
                        />
                      </button>
                    </div>
                  </div>
                </div>
               
               <div className="quantity-control-container">
                <div className="quantity-control">
                  <button
                   style={{fontSize:"21px"}}
                   onClick={() => decrementOrderQuantity(order._id)}>
                    -
                  </button>
                  <span>{order.quantity}</span>
                  <button 
                                     style={{fontSize:"21px"}}
                  onClick={() => incrementOrderQuantity(order._id)}>
                    +
                  </button>
                </div>
              </div>
              </div>
            ))
          ) : (
            <div>Корзина пуста</div>
          )}
        </div>
        {orders.length > 0 && (
          <button className="clear-orders" onClick={clearOrders}>
            Очистить корзину
          </button>
        )}
      </div>

      {orders.length > 0 && (
        <div className="sum_total_menu">
          {orders.map((order) => (
            <p key={order._id}>
              {order.title}.....................{order.price * order.quantity}ТГ
            </p>
          ))}
          <div className="line"> 
          </div>
          <div className="total_price">Итого: {totalSum}ТГ</div>
        </div>
      )}

      <Link
        style={{ textDecoration: "none" }}
        to={`/restaurant/${restaurant._id}/menu`}
      >
        <div className="btn-backto-page">Вернуться на страницу меню</div>
      </Link>

      {modalVisible && (
        <div className="modals">
          <div className="modal-contents">
            <span className="close" onClick={hideModal}>
              Закрыть
            </span>
            <img src={modalContent.image} alt="Dish" />
            <h1>{modalContent.title}</h1>
            <p>{modalContent.description}</p>
            <p className="modal_price">{modalContent.price}ТГ</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyOrders;
