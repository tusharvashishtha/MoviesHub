import ReactPlayer from "react-player";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { useNavigate, Link } from "react-router-dom";
import NotFound from "../NotFound";

const Trailer = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const category = pathname.includes("movie") ? "movie" : "tv";
  const ytvideo = useSelector((state) => state[category].info.videos);
  return(
    <div className="bg-[rgba(0,0,0,.9)] absolute top-0 z-100 left-0 w-screen h-screen flex items-center justify-center">
      <Link
        onClick={() => navigate(-1)}
        className="absolute text-3xl right-[5%] top-[6%] text-zinc-400 hover:text-[#6556CD] duration-300 ri-close-fill"
      ></Link>
      {ytvideo ?   <ReactPlayer
        height={800} 
        width={1200}
        url={`https://www.youtube.com/watch?v=${ytvideo.key}`}
      /> : <NotFound />}
    
    </div> 
  )
};

export default Trailer;
