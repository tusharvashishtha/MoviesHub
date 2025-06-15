import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../utils/axios";
import InfiniteScroll from "react-infinite-scroll-component";
import Cards from "./partials/Cards";
import Dropdown from "./partials/Dropdown";
import Topnav from "./partials/Topnav";
import Loading from "./Loading";

const TvShows = () => {
  const navigate = useNavigate();
  const [category, setcategory] = useState("airing_today");
  const [tv, settv] = useState([]);
  const [page, setpage] = useState(1);
  const [hasMore, sethasMore] = useState(true);
  document.title = "MoviesHub | Tv Shows";

  const GetTv = async () => {
    try {
      const { data } = await axios.get(`/tv/${category}?page=${page}`);
      if (data.results.length > 0) {
        settv((prev) => [...prev, ...data.results]);
        setpage((prev) => prev + 1);
      } else {
        sethasMore(false);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const refreshHandler = () => {
    if (tv.length === 0) {
      GetTv();
    } else {
      setpage(1);
      settv([]);
      GetTv();
    }
  };

  useEffect(() => {
    refreshHandler();
  }, [category]);

  return tv.length > 0 ? (
    <div className="w-[100vw] h-screen">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mt-4 mb-4 px-[3%]">
        <div className="flex items-center w-full gap-3 md:w-auto mb-4 md:mb-0">
          <div className="flex items-center gap-3">
            <i
              onClick={() => navigate(-1)}
              className="text-2xl text-zinc-400 hover:text-[#6556CD] ri-arrow-left-line cursor-pointer"
            ></i>
            <h1 className="text-xl font-semibold text-white">Tv</h1>
          </div>
          <div className="flex-grow">
            <Topnav />
          </div>
        </div>
        <div className="w-full md:w-auto">
          <Dropdown
            title="Category"
            options={["airing_today", "popular", "top_rated", "on_the_air"]}
            func={(e) => setcategory(e.target.value)}
          />
        </div>
      </div>

      <InfiniteScroll
        dataLength={tv.length}
        next={GetTv}
        hasMore={hasMore}
        loader={<h1>Loading...</h1>}
      >
        <Cards data={tv} title="tv" />
      </InfiniteScroll>
    </div>
  ) : (
    <Loading />
  );
};

export default TvShows;
