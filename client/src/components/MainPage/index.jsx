import React from 'react'
import MainBanner from '../MainBanner'
import Institution from '../Institution'
import './Mainpage.css'

const MainPage = () => {
  return (
    <div className='App'>
        <MainBanner/>
        <Institution/>
    </div>
  )
}

export default MainPage