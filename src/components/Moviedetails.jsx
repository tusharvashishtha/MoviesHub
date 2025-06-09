import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { asyncloadmovie, removemovie } from "../store/actions/MovieActions";
import { Link } from "react-router-dom";
import Loading from "../components/Loading";

const Moviedetails = () => {
  const navigate = useNavigate();
  const {pathname} = useLocation();
  const { id } = useParams();
  const { info } = useSelector((state) => state.movie);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(asyncloadmovie(id));
    return () => {
      dispatch(removemovie());
    };
  }, [dispatch, id]);

  return info ? (
    <div
      style={{
        background: `linear-gradient(rgba(0,0,0,.3),rgba(0,0,0,.8),rgba(0,0,0,.9)), url(https://image.tmdb.org/t/p/original/${info.detail.backdrop_path})`,
        backgroundPosition: "top-10%",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
      }}
      className="w-screen h-screen px-[10%] text-xl"
    >
      {/* Navigation */}
      <nav className="h-[10vh] w-full text-zinc-300 flex items-center gap-10 ">
        <Link
          onClick={() => navigate(-1)}
          className=" text-zinc-400 hover:text-[#6556CD] duration-300 ri-arrow-left-line"
        ></Link>
        <a
          target="_blank"
          rel="noreferrer"
          className="hover:text-[#6556CD] duration-300"
          href={info.detail.homepage}
        >
          <i className="ri-external-link-line"></i>
        </a>
        <a
          target="_blank"
          rel="noreferrer"
          className="hover:text-[#6556CD] duration-300"
          href={`https://www.wikidata.org/wiki/${info.externalid.wikidata_id}`}
        >
          <i className="ri-earth-fill"></i>
        </a>
        <a
          target="_blank"
          rel="noreferrer"
          className="hover:text-[#6556CD] duration-300 "
          href={`https://www.imdb.com/title/${info.externalid.imdb_id}/`}
        >
          Imdb
        </a>
      </nav>

      {/* Part 2 Poster and details */}
      <div className="w-full flex">
        <img
          className="shadow-xl/30 object-cover h-[50vh]"
          src={`https://image.tmdb.org/t/p/original/${
            info.detail.poster_path || info.detail.backdrop_path
          }`}
          alt=""
        />

        <div className="content ml-[5%]">
          <h1 className="text-5xl font-black text-white">{info.detail.name ||info.detail.original_name  || info.detail.title ||info.detail.original_title}
          <small className="text-2xl font-bold text-zinc-300">
            ({info.detail.release_date.split("-")[0]})
          </small>

          </h1>

          <div className="mt-3 mb-3 flex text-white items-center gap-x-5 ">
           <span className='bg-yellow-600  text-white font-semibold w-[9vh] h-[4vh] flex justify-center items-center'><i className="mr-[1vh] ri-star-fill"></i>{((info.detail.vote_average * 10).toFixed())/10}
           </span>
           <h1 className="font-semibold w-[70px] text-2xl leading-7">Ratings</h1>
           <h1>{info.detail.release_date}</h1>
           <h1>{info.detail.genres.map((g) => g.name).join(' , ')}</h1>
           <h1>{info.detail.runtime}min</h1>
          </div>

          <h1 className="text-2xl font-semibold italic text-zinc-200">{info.detail.tagline}</h1>

          <h1 className="text-2xl text-white mb-3 mt-5">Overview</h1>
          <p className="text-xl text-white italic">{info.detail.overview}</p>

          <Link to={`${pathname}/trailer`}>Play Trailer</Link>
        
         
        </div>
      </div>

      {/* Part 3 avilavle on  flexPlatforms */}
      <div className="w-[30%]  flex flex-col justify-between gap-y-5 mt-10">
        {/* Flatrate Providers */}
    
          {info.watchproviders && info.watchproviders.flatrate && (
            <div className="flex gap-x-10 items-center text-white">
              <div className=" w-[55%]">
              <h1>Available on Platforms</h1>
              </div>
      
              {info.watchproviders.flatrate.map((w, i) => (
                <img
                title={w.provider_name}
                  key={i}
                  className="w-[5vh] rounded-md object-cover"
                  src={`https://image.tmdb.org/t/p/original/${w.logo_path}`}
                  alt=""
                />
              ))}
            </div> 
          )}

          {info.watchproviders && info.watchproviders.rent && (
            <div className="flex gap-x-10 items-center text-white">
              <div className=" w-[55%]">
              <h1>Available on Rent</h1>

              </div>
              {info.watchproviders.rent.map((w, i) => (
                <img
                title={w.provider_name}
                  key={i}
                  className="w-[5vh] rounded-md object-cover"
                  src={`https://image.tmdb.org/t/p/original/${w.logo_path}`}
                  alt=""
                />
              ))}
            </div>
          )}

          {info.watchproviders && info.watchproviders.buy && (
            <div className="flex gap-x-10 items-center text-white">
              <div className=" w-[55%]">
              <h1>Available to Buy</h1>
              </div>
              {info.watchproviders.buy.map((w, i) => (
                <img
                  title={w.provider_name}
                  key={i}
                  className="w-[5vh] rounded-md object-cover"
                  src={`https://image.tmdb.org/t/p/original/${w.logo_path}`}
                  alt=""
                />
              ))}
            </div>
          )}
    
      </div>
    </div>
  ) : (
    <Loading />
  );
};

export default Moviedetails;
