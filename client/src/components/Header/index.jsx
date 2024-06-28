import React, { useEffect } from 'react';
import timeclock from '../../assets/time.png';
import location from '../../assets/location.png';
import whatsapp from '../../assets/whatsapp.png';
import instagram from '../../assets/instagram.png';
import heartVector from '../../assets/Vector.png';
import { useParams, Link } from 'react-router-dom';
import { useRestaurants } from '../../Context/APIcontext';

const Header = () => {
    const { id } = useParams();
    const { restaurant, loading, error, getFetchDataRestaurant } = useRestaurants();

    useEffect(() => {
        getFetchDataRestaurant(id);
    }, [id, getFetchDataRestaurant]);

    if (!restaurant) {
        return <div>No restaurant data found.</div>;
    }
    return (
        <>
          <header>
                <Link to='/'>Назад</Link>
                {restaurant && (
                    <>
                        <div className='header_logo'>
                            <img src={restaurant.logo} alt={`${restaurant.title} logo`} />
                        </div>
                        <div className='info-block'><img src={timeclock} alt='time' /> 12:00-01:00</div>
                        <div className='info-block'><img src={location} alt='location' /> БЦ «ERTIS», Абая 99B, 3 этаж</div>
                        <div className='info-block info-block-green'><span>Позвонить</span></div>
                        <div><img src={whatsapp} alt='whatsapp' /></div>
                        <div><img src={instagram} alt='instagram' /></div>
                        <div className='my-orders'> Мой заказ <img src={heartVector} alt='heart' /> </div>
                    </>
                )}
            </header>
        </>
    )
}

export default Header