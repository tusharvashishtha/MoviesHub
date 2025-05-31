import { useState } from 'react'
import './App.css'
import { Routes, Route } from 'react-router-dom'
import Home from './components/Home'
import Loading from './components/Loading'

function App() {

  return (
    <div className='bg-[#1F1E24] max-w-screen h-fit flex'>
     <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/l' element={<Loading />} />
      </Routes> 
    </div>
  )
}

export default App
