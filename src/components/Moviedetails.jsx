import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Outlet, useLocation, useNavigate, useParams } from "react-router-dom";
import { asyncloadmovie, removemovie } from "../store/actions/MovieActions";
import { Link } from "react-router-dom";
import Loading from "../components/Loading";
import HorizontalCards from "../components/partials/HorizontalCards"

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
      className="w-screen h-[150vh] overflow-x-hidden px-[10%] text-xl"
    >
      {/*Part 1 Navigation */}
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
      <div className="w-full flex flex-col md:flex-row">
        <img
          className="shadow-xl/30 object-cover md:h-[50vh]"
          src={`https://image.tmdb.org/t/p/original/${
            info.detail.poster_path || info.detail.backdrop_path
          }`}
          alt=""
        />

        <div className="content mt-10 md:mt-0 ml-[5%]">
          <h1 className="md:text-5xl text-2xl  font-black text-white">{info.detail.name ||info.detail.original_name  || info.detail.title ||info.detail.original_title}
          <small className="text-2xl font-bold text-zinc-300">
            ({info.detail.release_date.split("-")[0]})
          </small>

          </h1>

          <div className="mt-3 mb-3 flex flex-col md:flex-row text-white items-center gap-x-5 ">
           <span className='bg-yellow-600 mt-5  text-white font-semibold w-[9vh] h-[4vh] flex justify-center items-center'><i className="mr-[1vh] ri-star-fill"></i>{((info.detail.vote_average * 10).toFixed())/10}
           </span>
           <h1 className="font mt-3 semibold w-[70px] text-2xl leading-7">Ratings</h1>
           <h1 className="mt-3">{info.detail.release_date}</h1>
           <h1 className="mt-3">{info.detail.genres.map((g) => g.name).join(' , ')}</h1>
           <h1 className="mt-3">{info.detail.runtime}min</h1>
          </div>

          <h1 className="text-2xl font-semibold italic text-zinc-200">{info.detail.tagline}</h1>

          <h1 className="text-2xl text-white mb-3 mt-5">Overview</h1>
          <p className="mb-[15%] md:mb-[5%]  text-xl text-white italic">{info.detail.overview}</p>

          <Link className="p-5 bg-[#6556CD] m-10 md:m-0 rounded-md" to={`${pathname}/trailer`}><i className="text-xl ri-film-line"></i>Play Trailer</Link>
        
         
        </div>
      </div>

      {/* Part 3 avilavle on  flexPlatforms */}
      <div className="w-[30%] flex flex-col justify-between gap-y-5 mt-10">
        {/* Flatrate Providers */}
    
          {info.watchproviders && info.watchproviders.flatrate && (
            <div className="flex flex-col md-flex-row gap-x-10 items-center text-white">
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

      {/* Part 4 */}
   
      <h1 className="mt-10 mb-5 text-3xl font-bold text-yellow-600" >   <hr className="text-white mt-10 mb-10 h-[2px] bg-zinc-500" /> Recommendatons and Similar</h1>
      <HorizontalCards data={info.recommendations.length > 0 ? info.recommendations : info.similar} /> 
    <Outlet />
    </div>
  ) : (
    <Loading />
  );
};

export default Moviedetails;
