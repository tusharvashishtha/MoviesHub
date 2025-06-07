import React from "react";
import { Link } from "react-router-dom";

const Header = ({ data }) => {

  return (
    <div
      style={{
        background: `linear-gradient(rgba(0,0,0,.3),rgba(0,0,0,.8),rgba(0,0,0,.9)), url(https://image.tmdb.org/t/p/original/${
          data.backdrop_path || data.profile_path
        })`, 
        backgroundPosition: 'top-10%',
        backgroundSize: 'cover',
        backgroundRepeat: "no-repeat"
      }}
      className="w-full object-contain h-[70vh] flex flex-col justify-center items-start p-[5%]"
    >
      <h1 className="w-[70%] text-base sm:text-lg md:text-xl lg:text-3xl xl:text-3xl font-black text-white">
        {
            data.name ||
            data.original_name ||
            data.original_title
        }
        </h1>

        <p className="w-[70%] mt-4 text-base sm:text-base md:basel lg:text-base xl:text-base text-white">{data.overview.slice(0,200)}...<Link to = {`/${data.media_type}/details/${data.id}`} className="text-blue-400">more</Link></p>

        <p className="text-white mt-3 flex gap-2">
            <i className="text-yellow-600 ri-megaphone-fill"></i>{data.release_date || "No Information"}
            <i className="ml-5 text-yellow-600 ri-video-on-fill"></i>{data.media_type.toUpperCase()}
        </p>
        <Link className="bg-[#6556CD] p-4 rounded text-white font-semibold mt-5">Watch Trailer</Link>
    </div>
  );
};

export default Header;
