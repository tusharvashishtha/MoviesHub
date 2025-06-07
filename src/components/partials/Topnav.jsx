import {React , useEffect} from 'react'
import { Link } from 'react-router-dom'
import { useState } from 'react';
import axios from '../../utils/axios';
import noimage from '/noImage.png'


const Topnav = () => {
  const [query, setQuery] = useState("");
  const [searches, setsearches] = useState([]);
    const GetSearches = async() =>{
      try {
        const {data} = await axios.get(`/search/multi?query=${query}`);
        setsearches(data.results)

      } catch (error) {
        console.log(error)
      }
    }
  
    useEffect(()=> {
      GetSearches();
    },[query])

  return (
    <div className='w-[80%] h-[10vh] relative flex mx-auto items-center left-[2%]'>
        <i className="ri-search-line text-3xl text-zinc-400"></i>
        <input
        onChange={(e)=> setQuery(e.target.value)}
        value={query}
         className='w-[50%] mx-10 p-3 text-xl outline-none border-none bg-transparent text-zinc-200' type='text' placeholder='search anything' />    
         {query.length > 0 && <i onClick={()=>setQuery("")} className="right-0 ri-close-fill text-3xl text-zinc-400"></i>}
        

        <div className='z-[100] overflow-auto absolute w-[50%] max-h-[50vh] bg-zinc-200 left-[5%] top-[100%]'>

          {searches.map((s,i)=>(
            <Link 
            key={i} 
            className = "hover:text-black hover:bg-zinc-400 duration-300 font-semibold text-zinc-600 w-[100%] p-5 flex justify-start items-center border-b-2 border-zinc-100">
          <img
          className='w-[8vh] h-[8vh] object-cover rounded-full mr-5 shadow-lg'
           src={s.backdrop_path || s.profile_path ?
            `https://image.tmdb.org/t/p/original/${s.backdrop_path || s.profile_path
           }` : noimage
           
           } alt='' />
          <span>{s.name || s.title || s.original_name || s.original_title}</span>
          </Link>
          ))}
    
          
        </div>
    </div>
  )
}

export default Topnav