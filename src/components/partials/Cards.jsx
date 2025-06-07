import React from 'react';
import { Link } from 'react-router-dom';
import noImage from "/noImage.png"

const Cards = ({data , title}) => {
  return (
    <div className='flex flex-wrap justify-around w-ful h-full px-[3%] bg-[#1F1E24]'>
        {data.map((c,i) =>( 
            <Link to={`/${c.media_type || title}/details/${c.id}`}  className='relative w-[35vh] mr-[5%] mb-[5%] ' key={i} >
                <img className='shadow-xl/30 object-cover h-[50vh]' src={`https://image.tmdb.org/t/p/original/${
         c.poster_path ||  c.backdrop_path || c.profile_path
        }`} alt='' />
        <h1 className='text-xl text-zinc-400 mt-3 font-semibold'>
         { c.name ||c.original_name  || c.title ||c.original_title ? c.name ||c.original_name  || c.title ||c.original_title : noImage
         } 
         </h1>

         {
            c.vote_average && (<div className='bg-yellow-600 absolute rounded left-[-10%] top-[10%] text-white font-semibold w-[9vh] h-[4vh] flex justify-center items-center'><i className="mr-[1vh] ri-star-fill"></i>{((c.vote_average * 10).toFixed())/10}
         </div>)
         }
         

            </Link> 
            
            ))}
    </div>
  )
}

export default Cards