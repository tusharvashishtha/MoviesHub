import { useState ,useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../utils/axios";
import InfiniteScroll from "react-infinite-scroll-component";
import Cards from "./partials/Cards";
import Dropdown from "./partials/Dropdown";
import Topnav from "./partials/Topnav";
import Loading from "./Loading";

const Movies = () => {
   const navigate = useNavigate();
    const [category, setcategory] = useState("now_playing");
    const [movie, setmovie] = useState([]);
    const [page, setpage] = useState(1);
    const [hasMore, sethasMore] = useState(true)
    document.title = "MoviesHub | Movies"

         const GetMovie = async() =>{
          try {
            const {data} = await axios.get(`/movie/${category}?page=${page}`);
            if(data.results.length > 0){
              setmovie((prev) => [...prev, ...data.results])
              setpage((prev) => prev + 1)
            }else{
              sethasMore(false)
            }
    
          } catch (error) {
            console.log(error)
          }
        }  

        const refreshHandler =  () => {
          if(movie.length === 0) {
            GetMovie()
          }else{
            setpage(1);
            setmovie([])
            GetMovie();
          }
        }

        useEffect(() => {
            refreshHandler()    
        },[category])
          
  return movie.length > 0 ? (
    <div className=' w-screen h-screen '>
        <div className='px-[3%] w-full flex items-center justify-between'>
            <h1 className='w-[20%] text-xl text-zinc-400 font-semibold'>
            <i onClick={() => navigate(-1)} className=" text-zinc-400 hover:text-[#6556CD] ri-arrow-left-line"></i>
            Movie<small className="ml-2 text-sm text-zinc-600">({category})</small></h1>

            <div className='flex items-center w-[75%]'>
              <Topnav />
            <Dropdown title="Category" options={["popular", "top_rated","upcoming" , "now_playing"]}
            func={(e) => setcategory(e.target.value)} />
            <div className='w-[2%]'></div>
        
            </div>

          
        </div>

        <InfiniteScroll
         dataLength={movie.length}
         next={GetMovie}
         hasMore = {hasMore}
         loader={<h1>Loading...</h1>}
         >
        <Cards data={movie} title = {category} />
        </InfiniteScroll>


    </div>
  ) : <Loading />
}

export default Movies