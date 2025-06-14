import { useState } from 'react'
import './App.css'
import { Routes, Route } from 'react-router-dom'
import Home from './components/Home'
import Trending from './components/Trending'
import Popular from './components/Popular'
import Movies from './components/Movies'
import TvShows from './components/TvShows'
import People from './components/People'
import About from './components/About'
import Moviedetails from './components/Moviedetails'
import TvDetails from './components/TvDetails'
import PersonDetails from './components/PersonDetails'
import Trailer from './components/partials/Trailer'
import NotFound from './components/NotFound' 
function App() {

  return (
    <div className='bg-[#1F1E24] max-w-screen h-[fit] flex'>
      <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/trending' element={<Trending/>} />
      <Route path='/trending' element={<Trending/>} />
      <Route path='/popular' element={<Popular/>} />
      <Route path='/movie' element={<Movies/>} />
      <Route path='/movie/details/:id' element = {<Moviedetails />} >
      <Route path='/movie/details/:id/trailer' element = {<Trailer />} />
      </Route>
      <Route path='/tvshows' element={<TvShows/>} />
      <Route path='/tv/details/:id' element = {<TvDetails />}>
      <Route path='/tv/details/:id/trailer' element = {<Trailer />} />
      </Route>
      <Route path='/people' element={<People/>} />
      <Route path='/people/details/:id' element = {<PersonDetails />} />
      <Route path='/about' element={<About />} />
     
      </Routes>
  
    </div>
  ) 
}

export default App
