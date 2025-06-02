import React from 'react';
import { Link } from 'react-router-dom';

const Cards = ({data , title}) => {
    
  return (
    <div className='flex flex-wrap justify-around w-full'>
        {data.map((c,i) =>( 
            <Link className=' w-[35vh] mr-[5%] mb-[5%] ' key={i} >
                <img className='shadow-xl/30 object-cover h-[50vh]' src={`https://image.tmdb.org/t/p/original/${
         c.poster_path ||  c.backdrop_path
        }`} alt='' />
        <h1 className='text-xl text-zinc-400 mt-3 font-semibold'>
         { c.name ||c.original_name  || c.title ||c.original_title
         }
            
         </h1>
            </Link> 
            
            ))}
    </div>
  )
}

export default Cards