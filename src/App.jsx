import { useState } from 'react'
import './App.css'
import { Routes, Route } from 'react-router-dom'
import Home from './components/Home'

function App() {

  return (
    <div className='bg-[#1F1E24] max-w-screen h-fit flex'>
     <Routes>
      <Route path='/' element={<Home />} />
      </Routes> 
    </div>
  )
}

export default App
