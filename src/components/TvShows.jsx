import { useState ,useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../utils/axios";
import InfiniteScroll from "react-infinite-scroll-component";
import Cards from "./partials/Cards";
import Dropdown from "./partials/Dropdown";
import Topnav from "./partials/Topnav";
import Loading from "./Loading";

const TvShows = () => {
     const navigate = useNavigate();
    const [category, setcategory] = useState("popular");
    const [tv, settv] = useState([]);
    const [page, setpage] = useState(1);
    const [hasMore, sethasMore] = useState(true)
    document.title = "MoviesHub | Tv Shows"

         const GetTv  = async() =>{
          try {
            const {data} = await axios.get(`/tv/${category}?page=${page}`);
            if(data.results.length > 0){
              settv((prev) => [...prev, ...data.results])
              setpage((prev) => prev + 1)
            }else{
              sethasMore(false)
            }
    
          } catch (error) {
            console.log(error)
          }
        }  

        const refreshHandler =  () => {
          if(tv.length === 0) {
            GetTv()
          }else{
            setpage(1);
            settv([])
            GetTv();
          }
        }

        useEffect(() => {
            refreshHandler()    
        },[category])
  return tv.length > 0 ? (
    <div className=' w-screen h-screen '>
        <div className='px-[3%] w-full flex items-center justify-between'>
            <h1 className='w-[20%] text-xl text-zinc-400 font-semibold'>
            <i onClick={() => navigate(-1)} className=" text-zinc-400 hover:text-[#6556CD] ri-arrow-left-line"></i>
            Movie<small className="ml-2 text-sm text-zinc-600">({category})</small></h1>

            <div className='flex items-center w-[75%]'>
              <Topnav />
            <Dropdown title="Category" options={["popular", "top_rated","on_the_air" , "airing_today"]}
            func={(e) => setcategory(e.target.value)} />
            <div className='w-[2%]'></div>
        
            </div>

          
        </div>

        <InfiniteScroll
         dataLength={tv.length}
         next={GetTv}
         hasMore = {hasMore}
         loader={<h1>Loading...</h1>}
         >
        <Cards data={tv} title = {category} />
        </InfiniteScroll>


    </div>
  ) : <Loading />
}

export default TvShows