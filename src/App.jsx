import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home/Home'
import Favorites from './pages/Favorites/Favorites'
import Detail from './pages/Detail/Detail'
import Navbar from './components/Navbar/Navbar'

export default function App()
{
  return (
    <div className='App_container'>
      <Navbar />

      <Routes>
        <Route path='/' element={<Home />}></Route>
        <Route path='/favorites' element={<Favorites />}></Route>
        <Route path='/detail/:id' element={<Detail />}></Route>
      </Routes>
    </div>
  )
}

// 라우트 설정 (3개 페이지)
// 각 항목(디테일정보)마다 페이지를 나누어서