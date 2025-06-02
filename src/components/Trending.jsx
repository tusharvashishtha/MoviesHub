import {React, useEffect, useState }from 'react'
import { useNavigate } from 'react-router-dom'
import Topnav from './partials/Topnav'
import Dropdown from './partials/Dropdown'
import axios from '../utils/axios'

const Trending = () => {
    const navigate = useNavigate();
    const [category, setcategory] = useState("all");
    const [duration, setduration] = useState("day");
    const [trending, settrending] = useState(null);

        const GetTrending = async() =>{
          try {
            const {data} = await axios.get(`/trending/${category}/${duration}`);
            settrending(data.results)
    
          } catch (error) {
            console.log(error)
          }
        }  

        useEffect(() => {
            GetTrending()
        },[category,duration])

  return (
    <div className='px-[3%] w-screen h-screen'>
        <div className=' w-full flex items-center justify-between'>
            <h1 className='w-[20%] text-xl text-zinc-400 font-semibold'>
            <i onClick={() => navigate(-1)} className=" text-zinc-400 hover:text-[#6556CD] ri-arrow-left-line"></i>
            Trending</h1>

            <div className='flex items-center w-[75%]'>
              <Topnav />
            <Dropdown title="Category" options={["movie","tv","all"]}
            func="" />
            <div className='w-[2%]'></div>
            <Dropdown title="Duration" options={["week","day"]}
            func="" />
            </div>

          
        </div>



    </div>
  )
}

export default Trending