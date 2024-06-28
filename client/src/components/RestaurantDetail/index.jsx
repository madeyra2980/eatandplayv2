import React, { useEffect } from 'react';
import './RestaurantDetail.css';
import { useParams, Link } from 'react-router-dom';
import { useRestaurants } from '../../Context/APIcontext';
import phone from '../../assets/phone1.png'
import phonesecond from '../../assets/phone2.png'
import image1 from '../../assets/image1.png'
import pasta from '../../assets/pastavtrlke.png'
import Footer from '../Footer';
import Header from '../Header';


const RestaurantDetail = () => {
  const { id } = useParams();
  const { restaurant, loading, error, getFetchDataRestaurant } = useRestaurants();

  useEffect(() => {
    getFetchDataRestaurant(id);
  }, [id, getFetchDataRestaurant]);


  if (!restaurant) {
    return <div>Нету ресторанов Вообще</div>;
  }

  return (
    <div className='restaurant-detail'>
      <Header />
    
      <main>
        {restaurant && (
          <>
            <div className='banner-restaurant'>
              <img src={restaurant.banner} alt={`${restaurant.title} banner`} />
              <div className='banner-text'>
                <h1>{restaurant.title}</h1>
                <p>{restaurant.description}</p>
              </div>
            </div>
          </>
        )}

        <div className='items_block'>
          <Link to={`/restaurant/${id}/menu`}><div className='item_block'>Меню <img src={pasta} alt="" /> </div></Link>
          <Link to={`/games/${id}`}><div className='item_block'>Игры на компанию<img src={phone} alt="" /></div></Link>
          <Link><div className='item_block'>Акции и скидки <img src={phonesecond} alt="" /> </div></Link>
          <Link><div className='item_block'>ЗD тур<img src={image1} alt="" /></div></Link>
        </div>

      </main>
{/* {      console.log(restaurant)} */}

      <Footer />
    </div>
  );
};

export default RestaurantDetail;
