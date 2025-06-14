import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Outlet, useLocation, useNavigate, useParams } from "react-router-dom";
import {asyncloadperson , removepeople} from '../store/actions/PersonActions'
import { Link } from "react-router-dom";
import Loading from "../components/Loading";
import HorizontalCards from "../components/partials/HorizontalCards"

function PersonDetails() {
  const navigate = useNavigate();
  const {pathname} = useLocation();
  const { id } = useParams();
  const { info } = useSelector((state) => state.person);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(asyncloadperson(id));
    return () => {
      dispatch(removepeople());
    };
  }, [dispatch, id]);

  return info ? (
    <div className="px-[15%] w-screen h-screen flex flex-col">
       {/*Part 1 Navigation */}
            <nav className="h-[10vh] w-full text-zinc-300 flex items-center gap-10 ">
              <Link
                onClick={() => navigate(-1)}
                className=" text-zinc-400 hover:text-[#6556CD] duration-300 ri-arrow-left-line"
              ></Link>
            </nav>

              <div className="w-full flex flex-col">
              {/* Part 2 left poster and details */}
              <div className="w-[20%]">
                <img
          className="shadow-xl/30 object-cover w-[100%] h-[40vh]"
          src={`https://image.tmdb.org/t/p/original/${
            info.detail.profile_path
          }`}
          alt=""
        />
        <hr className="text-white mt-10 mb-5 h-[2px] bg-zinc-500" /> 
         </div>

         {/* social media links */}
        <div className="text-white text-2xl flex gap-x-5">
              <a
                target="_blank"
                rel="noreferrer"
                className="hover:text-[#6556CD] duration-300 "
                href={`https://www.wikidata.org/wiki/${info.externalid.wikidata_id}`}
              >
                <i className="ri-earth-fill"></i>
              </a>
              <a
                target="_blank"
                rel="noreferrer"
                className="hover:text-[#6556CD] duration-300 "
                href={`https://www.facebook.com/${info.externalid.facebook_id}`}
              >
               <i class="ri-facebook-circle-fill"></i>
              </a>
              <a
                target="_blank"
                rel="noreferrer"
                className="hover:text-[#6556CD] duration-300 "
                href={`https://www.instagram.com//${info.externalid.instagram_id}`}
              >
               <i class="ri-instagram-fill"></i>
              </a>
              <a
                target="_blank"
                rel="noreferrer"
                className="hover:text-[#6556CD] duration-300 "
                href={`https://x.com/${info.externalid.twitter_id}`}
              >
               <i class="ri-twitter-x-fill"></i>
              </a>
       
              </div>

              {/* part 3 details and info */}
              <div className="w-[80%]">

              </div>

        </div>
             
    </div>
  ) : (
    <Loading />
  );
}

export default PersonDetails