import { useState } from 'react'
import './App.css'
import { Routes, Route } from 'react-router-dom'
import Home from './components/Home'
import Trending from './components/Trending'
import Popular from './components/partials/Popular'

function App() {

  return (
    <div className='bg-[#1F1E24] max-w-screen h-fit flex'>
     <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/trending' element={<Trending/>} />
      <Route path='/trending' element={<Trending/>} />
      <Route path='/popular' element={<Popular/>} />
      </Routes> 
    </div>
  )
}

export default App
