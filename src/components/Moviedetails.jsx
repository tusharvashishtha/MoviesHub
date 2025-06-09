import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { asyncloadmovie, removemovie } from "../store/actions/MovieActions";
import { Link } from "react-router-dom";
import Loading from "../components/Loading";

const Moviedetails = () => {
  const navigate = useNavigate();
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
      </div>

      {/* Part 3 avilavle on  flexPlatforms */}
      <div className="w-[80%] flex flex-col gap-y-5 mt-10">
        {/* Flatrate Providers */}
    
          {info.watchproviders && info.watchproviders.flatrate && (
            <div className="flex gap-x-10 items-center text-white">
              <h1>Available on Platforms</h1>
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
              <h1>Available on Rent</h1>
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
              <h1>Available to Buy</h1>
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
