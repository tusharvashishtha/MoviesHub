import {React, useEffect, useState }from 'react'
import { useNavigate } from 'react-router-dom'
import Topnav from './partials/Topnav'
import Dropdown from './partials/Dropdown'
import axios from '../utils/axios'
import Cards from './partials/Cards'
import Loading from './Loading'
import InfiniteScroll from 'react-infinite-scroll-component'


const Trending = () => {
    const navigate = useNavigate();
    const [category, setcategory] = useState("all");
    const [duration, setduration] = useState("day");
    const [trending, settrending] = useState([]);
    const [page, setpage] = useState(1);
    const [hasMore, sethasMore] = useState(true)

        const GetTrending = async() =>{
          try {
            const {data} = await axios.get(`/trending/${category}/${duration}?page=${page}`);
            // settrending(data.results)
            if(data.results.length > 0){
              settrending((prev) => [...prev, ...data.results])
              setpage((prev) => prev + 1)
            }else{
              sethasMore(false)
            }
    
          } catch (error) {
            console.log(error)
          }
        }  

        const refreshHandler =  () => {
          if(trending.length === 0) {
            GetTrending()
          }else{
            setpage(1);
            settrending([])
            GetTrending();
          }
        }

        useEffect(() => {
            refreshHandler()    
        },[category,duration])

  return trending.length > 0 ? (
    <div className=' w-screen h-screen '>
        <div className='px-[3%] w-full flex items-center justify-between'>
            <h1 className='w-[20%] text-xl text-zinc-400 font-semibold'>
            <i onClick={() => navigate(-1)} className=" text-zinc-400 hover:text-[#6556CD] ri-arrow-left-line"></i>
            Trending</h1>

            <div className='flex items-center w-[75%]'>
              <Topnav />
            <Dropdown title="Category" options={["movie","tv","all"]}
            func={(e) => setcategory(e.target.value)} />
            <div className='w-[2%]'></div>
            <Dropdown title="Duration" options={["week","day"]}
            func={(e) => setduration(e.target.value)} />
            </div>

          
        </div>

        <InfiniteScroll
         dataLength={trending.length}
         next={GetTrending}
         hasMore = {hasMore}
         loader={<h1>Loading...</h1>}
         >
        <Cards data={trending} title = {category} />
        </InfiniteScroll>


    </div>
  ) : <Loading />
}

export default Trending