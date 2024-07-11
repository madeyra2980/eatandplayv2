import React from 'react'
import lupa from '../../assets/lupa.png'
import shashki from '../../assets/shashki.png'
import stake from '../../assets/stake_1.png'
import menu from '../../assets/menu.png'
import kubik from '../../assets/kubik.png'
import sales from '../../assets/sales.png'
import video from '../../assets/video.png'
import './Main.css'
import Institution from '../Institution'


const Main = () => {
    return (

        <div className='App'>
            <div className='container_main'>
             
                <div className='header_banner'>
                    <div className='banner_titles'>
                    <h1>EAT&PLAY</h1>
                    <p>Сервис по поиску заведений <span>подходящего под ваш запрос <img src={lupa} alt="" /> </span></p>
                    </div>
            
                </div>
                <Institution/>
            </div>
        </div>
    )
}

export default Main