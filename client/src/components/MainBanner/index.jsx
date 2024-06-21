import React from 'react'
import lupa from '../../assets/lupa.png'
import shashki from '../../assets/shashki.png'
import stake from '../../assets/stake_1.png'
import menu from '../../assets/menu.png'
import kubik from '../../assets/kubik.png'
import sales from '../../assets/sales.png'
import video from '../../assets/video.png'
import './Main.css'

const Main = () => {
    return (

        <div className='App'>
            <div className='container_main'>
                <div className='shashki_main'>
                    <img src={shashki} alt="" />
                </div>
                <div className='header_banner'>
                    <h1>EAT&PLAY</h1>
                    <p>Сервис по поиску заведений <span>подходящего под ваш запрос <img src={lupa} alt="" /> </span></p>
                    <div className='header_items'>
                        <div className='header_items_card'>
                            <img src={menu} alt="" />
                            <p>Выбирайте меню</p>
                        </div>
                        <div className='header_items_card'>
                            <img src={kubik} alt="" />
                            <p>Играйте в игры с компанией в нашем сервисе</p>
                        </div>
                        <div className='header_items_card'>
                            <img src={sales} alt="" />
                            <p>Узнавайте о действующих акциях</p>
                        </div>
                        <div className='header_items_card'>
                            <img src={video} alt="" />
                            <p>Посмотрите обстановку заведения через ЗD-тур</p>
                        </div>
                    </div>
                </div>
            
            </div>
        </div>
    )
}

export default Main