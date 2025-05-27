import React from 'react'
import { Link } from 'react-router-dom'
import { useState } from 'react';

const Topnav = () => {
  const [query, setQuery] = useState("");
  return (
    <div className='w-full h-[10vh] relative flex justify-start ml-[18%] items-center'>
        <i class="ri-search-line text-3xl text-zinc-400"></i>
        <input
        onChange={(e )=> setQuery(e.target.value)}
        value={query}
         className='w-[50%] mx-10 p-3 text-xl outline-none border-none bg-transparent text-zinc-200' type='text' placeholder='search anything' />
         {query.length > 0 && <i onClick={()=>setQuery("")} class="ri-close-fill text-3xl text-zinc-400"></i>}
        

        <div className='overflow-auto absolute w-[50%] max-h-[50vh] bg-zinc-200 top-[90%]'>
          {/* <Link className = "hover:text-black hover:bg-zinc-400 duration-300 font-semibold text-zinc-600 w-[100%] p-5 flex justify-start items-center border-b-2 border-zinc-100">
          <img src='' alt='' />
          <span>Hello everyone</span>
          </Link> */}
          
        </div>
    </div>
  )
}

export default Topnav