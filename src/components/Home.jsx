import React, { useEffect, useState } from 'react'
import Sidenav from './partials/Sidenav'
import Topnav from './partials/Topnav'
import axios from '../utils/axios'
import Header from './partials/Header'
import HorizontalCards from './partials/HorizontalCards'

const Home = () => {
    document.title = 'Home'
    const [wallpaper, setWallpaper] = useState(null);
    const [trending, setTreding] = useState(null);

    const getHeaderWallpaper = async() =>{
      try {
        const {data} = await axios.get(`/trending/all/day`);
        let randomdata = data.results[(Math.random() * data.results.length).toFixed()];
        setWallpaper(randomdata)

      } catch (error) {
        console.log(error)
      }
    }  
    const GetTrending = async() =>{
      try {
        const {data} = await axios.get(`/trending/all/day`);
        setTreding(data.results)

      } catch (error) {
        console.log(error)
      }
    }  

    useEffect(()=> {
      !wallpaper && getHeaderWallpaper();
      !trending &&  GetTrending(); 
    }, [])

  return wallpaper && trending ? (
    <>
    <Sidenav />
    <div className="w-[80%] h-ful overflow-auto overflow-x-hidden">
    <Topnav />
    <Header data = {wallpaper} />
    <HorizontalCards data = {trending} />
    </div>
    </>
  ): <h1>Loading</h1>
}

export default Home