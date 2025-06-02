import { useState ,useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../../utils/axios";
import InfiniteScroll from "react-infinite-scroll-component";
import Cards from "./Cards";
import Dropdown from "./Dropdown";
import Topnav from "./Topnav";
import Loading from "../Loading";
 
const Popular = () => {
    const navigate = useNavigate();
    const [category, setcategory] = useState("movie");
    const [popular, setpopular] = useState([]);
    const [page, setpage] = useState(1);
    const [hasMore, sethasMore] = useState(true)
    document.title = "MoviesHub | Popular"

         const GetPopular = async() =>{
          try {
            const {data} = await axios.get(`${category}/popular?page=${page}`);
            if(data.results.length > 0){
              setpopular((prev) => [...prev, ...data.results])
              setpage((prev) => prev + 1)
            }else{
              sethasMore(false)
            }
    
          } catch (error) {
            console.log(error)
          }
        }  

        const refreshHandler =  () => {
          if(popular.length === 0) {
            GetPopular()
          }else{
            setpage(1);
            setpopular([])
            GetPopular();
          }
        }

        useEffect(() => {
            refreshHandler()    
        },[category])
          
  return popular.length > 0 ? (
    <div className=' w-screen h-screen '>
        <div className='px-[3%] w-full flex items-center justify-between'>
            <h1 className='w-[20%] text-xl text-zinc-400 font-semibold'>
            <i onClick={() => navigate(-1)} className=" text-zinc-400 hover:text-[#6556CD] ri-arrow-left-line"></i>
            Popular</h1>

            <div className='flex items-center w-[75%]'>
              <Topnav />
            <Dropdown title="Category" options={["tv", "movie"]}
            func={(e) => setcategory(e.target.value)} />
            <div className='w-[2%]'></div>
        
            </div>

          
        </div>

        <InfiniteScroll
         dataLength={popular.length}
         next={GetPopular}
         hasMore = {hasMore}
         loader={<h1>Loading...</h1>}
         >
        <Cards data={popular} title = {category} />
        </InfiniteScroll>


    </div>
  ) : <Loading />
}

export default Popular