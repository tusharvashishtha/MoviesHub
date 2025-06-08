import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom';
import { asyncloadmovie, removemovie } from '../store/actions/MovieActions';
import { Link } from 'react-router-dom';
import Loading from '../components/Loading'

const Moviedetails = () => {
  const navigate = useNavigate(-1);
  const {id} = useParams()
 const {info} = useSelector((state) => state.movie)
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(asyncloadmovie(id))

    return () => {
      dispatch(removemovie());
    }
  },[])
  return info ? (
    <div style={{
        background: `linear-gradient(rgba(0,0,0,.3),rgba(0,0,0,.8),rgba(0,0,0,.9)), url(https://image.tmdb.org/t/p/original/${
          info.detail.backdrop_path 
        })`, 
        backgroundPosition: 'top-10%',
        backgroundSize: 'cover',
        backgroundRepeat: "no-repeat"
      }} className='w-screen h-screen px-[10%]'>
      <nav className='w-full text-zinc-400'>
         <Link onClick={() => navigate(-1)} className=" text-zinc-400 hover:text-[#6556CD] ri-arrow-left-line">
         </Link>
         <a href=""><i className="ri-external-link-line"></i></a>
         <a href=""><i className="ri-earth-fill"></i></a>
         <a href="">Imdb</a>
      </nav>
    </div>
  ) : <Loading />
}

export default Moviedetails