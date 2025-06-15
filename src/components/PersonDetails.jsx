import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Outlet, useLocation, useNavigate, useParams } from "react-router-dom";
import {asyncloadperson , removepeople} from '../store/actions/PersonActions'
import { Link } from "react-router-dom";
import Loading from "../components/Loading";
import HorizontalCards from "../components/partials/HorizontalCards"
import DummyHorizontalCards from "./partials/DummyHorizontalCards";

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
    <div className="px-[10%] w-[100vw] min-h-screen bg-[#1F1E24] flex flex-col">
       {/*Part 1 Navigation */}
            <nav className="h-[10vh] w-full text-zinc-300 flex items-center gap-10 ">
              <Link
                onClick={() => navigate(-1)}
                className=" text-zinc-400 hover:text-[#6556CD] duration-300 ri-arrow-left-line"
              ></Link>
            </nav>

              <div className="w-full flex flex-col md:flex-row items-center ">
              {/* Part 2 left poster and details */}
              <div className="md:w-[20%] w-[80%]">
                <img
          className="shadow-xl/30 object-cover w-[100%] h-[60vh] md:h-[40vh]"
          src={`https://image.tmdb.org/t/p/original/${
            info.detail.profile_path
          }`}
          alt=""
        />
        <hr className="text-white mt-10 mb-5 h-[2px] bg-zinc-500" /> 
         

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
               <i className="ri-facebook-circle-fill"></i>
              </a>
              <a
                target="_blank"
                rel="noreferrer"
                className="hover:text-[#6556CD] duration-300 "
                href={`https://www.instagram.com//${info.externalid.instagram_id}`}
              >
               <i className="ri-instagram-fill"></i>
              </a>
              <a
                target="_blank"
                rel="noreferrer"
                className="hover:text-[#6556CD] duration-300 "
                href={`https://x.com/${info.externalid.twitter_id}`}
              >
               <i className="ri-twitter-x-fill"></i>
              </a>
       
              </div>
              {/* personal information */}
              <h1 className="text-2xl text-zinc-400 font-semibold my-3">Info</h1>

              {/* <h1 className="text-lg text-zinc-400 font-semibold ">Known For</h1> */}
              <h1 className="text-2xl text-zinc-400 font-semibold mt-3">Known For</h1>
              <h1 className=" text-yellow-600 ">{info.detail.known_for_department}</h1>

              <h1 className="text-2xl text-zinc-400 font-semibold mt-3">Gender</h1>
              <h1 className=" text-yellow-600 ">{info.detail.gender === 2 ? "Male" : "Female"}</h1>

              <h1 className="text-2xl text-zinc-400 font-semibold mt-3">Birth Date</h1>
              <h1 className=" text-yellow-600 ">{info.detail.birthday}</h1>

              <h1 className="text-2xl text-zinc-400 font-semibold mt-3">Place Of Birth</h1>
              <h1 className=" text-yellow-600 ">{info.detail.place_of_birth}</h1>
          </div>
 
              {/* part 3 details and info */}
              <div className="w-[80%] ml-[5%]">
                <h1 className="text-6xl text-zinc-400 font-black my-3">{info.detail.name}</h1>

              {/* <h1 className="text-lg text-zinc-400 font-semibold ">Known For</h1> */}
              <h1 className="text-xl text-yellow-600 font-semibold mt-3">Biography</h1>
              <p className="text-zinc-400 mt-3">{info.detail.biography}</p>
              
              <h1 className="text-lg text-yellow-600 font-semibold mt-5 mb-3">
                Work
              </h1>
              <DummyHorizontalCards data={info.combinedCredits.cast} />
      
              </div>

        </div>
             
    </div>
  ) : (
    <Loading />
  );
}

export default PersonDetails