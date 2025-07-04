import React, { useEffect, useState } from 'react'
import Sidenav from './partials/Sidenav'
import Topnav from './partials/Topnav'
import axios from '../utils/axios'
import Header from './partials/Header'
import HorizontalCards from './partials/HorizontalCards'
import Dropdown from './partials/Dropdown'
import Loading from './Loading'

const Home = () => {
    document.title = 'Home'
    const [wallpaper, setWallpaper] = useState(null);
    const [trending, setTrending] = useState(null);
    const [category, setcategory] = useState("all");
    

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
        const {data} = await axios.get(`/trending/${category}/day`);
        setTrending(data.results)

      } catch (error) {
        console.log(error)
      }
    }  

    useEffect(()=> {
      !wallpaper && getHeaderWallpaper();
      GetTrending(); 
    }, [category])

  return wallpaper && trending ? (
    <>
    <Sidenav />
    <div className="w-[100%] md:w-[80%] h-full overflow-auto overflow-x-hidden">
    <Topnav />
    <Header data = {wallpaper} />
    <div className="flex justify-between items-center ">
      <h1 className="text-xl ml-3 font-semibold text-yellow-600">Trending</h1>
      <Dropdown title="All " options={["tv", "movie","all"]} func = {(e) => setcategory(e.target.value)} />
    </div>

    <HorizontalCards data = {trending}  />
    </div>
    </>
  ): <Loading />
}

export default Home