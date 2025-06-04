import { useState ,useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../utils/axios";
import InfiniteScroll from "react-infinite-scroll-component";
import Cards from "./partials/Cards";
import Dropdown from "./partials/Dropdown";
import Topnav from "./partials/Topnav";
import Loading from "./Loading";


const People = () => {
    const navigate = useNavigate();
    const [category, setcategory] = useState("popular");
    const [person, setperson] = useState([]);
    const [page, setpage] = useState(1);
    const [hasMore, sethasMore] = useState(true)
    document.title = "MoviesHub | People"

         const GetPerson  = async() =>{
          try {
            const {data} = await axios.get(`person/${category}?page=${page}`);
            if(data.results.length > 0){
              setperson((prev) => [...prev, ...data.results])
              setpage((prev) => prev + 1)
            }else{
              sethasMore(false)
            }
    
          } catch (error) {
            console.log(error)
          }
        }  

        const refreshHandler =  () => {
          if(person.length === 0) {
            GetPerson()
          }else{
            setpage(1);
            setperson([])
            GetPerson();
          }
        }

        useEffect(() => {
            refreshHandler()    
        },[category])

  return person.length > 0 ? (
    <div className=' w-screen h-screen '>
        <div className='px-[3%] w-full flex items-center justify-between'>
            <h1 className='w-[20%] text-xl text-zinc-400 font-semibold'>
            <i onClick={() => navigate(-1)} className=" text-zinc-400 hover:text-[#6556CD] ri-arrow-left-line"></i>
            People</h1>

            <div className='flex items-center w-[75%]'>
              <Topnav />

            <div className='w-[2%]'></div>
        
            </div>

          
        </div>

        <InfiniteScroll
         dataLength={person.length} 
         next={GetPerson}
         hasMore = {hasMore}
         loader={<h1>Loading...</h1>}
         >
        <Cards data={person} title = {category} />
        </InfiniteScroll>


    </div>
  ) : <Loading />
}

export default People