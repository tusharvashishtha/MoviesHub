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
  }, []);
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
      {/* {PART - 1 NAVIGATION} */}
      <nav className="h-[10vh] w-full text-zinc-300 flex items-center gap-10 ">
        <Link
          onClick={() => navigate(-1)}
          className=" text-zinc-400 hover:text-[#6556CD] duration-300 ri-arrow-left-line"
        ></Link>
        <a
          target="_blank"
          className="hover:text-[#6556CD] duration-300"
          href={info.detail.homepage}
        >
          <i className="ri-external-link-line"></i>
        </a>
        <a
          target="_blank"
          className="hover:text-[#6556CD] duration-300"
          href={`https://www.wikidata.org/wiki/${info.externalid.wikidata_id}`}
        >
          <i className="ri-earth-fill"></i>
        </a>
        <a
          target="_blank"
          className="hover:text-[#6556CD] duration-300 "
          href={`https://www.imdb.com/title/${info.externalid.imdb_id}/`}
        >
          Imdb
        </a>
      </nav>

      {/* {PART - 1 POSTER AND DETAILS} */}
      <div className="w-full flex">
        <div>
          <img
            className="shadow-xl/30 object-cover h-[50vh]"
            src={`https://image.tmdb.org/t/p/original/${
              info.detail.poster_path || info.detail.backdrop_path
            }`}
            alt=""
          />

          <div>
            {info.watchproviders &&
              info.watchproviders.flatrate &&
              info.watchproviders.flatrate.map((w, i) => (
                <img
                  key={i}
                  className="w[7h] rounded-md"
                  src={`https://image.tmdb.org/t/p/original/${w.logo_path}`}
                  alt=""
                />
              ))}
          </div>
        </div>
      </div>
    </div>
  ) : (
    <Loading />
  );
};

export default Moviedetails;
