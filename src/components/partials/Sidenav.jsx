import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const Sidenav = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isLargeScreen, setIsLargeScreen] = useState(window.innerWidth >= 768); // md = 768px

  useEffect(() => {
    const handleResize = () => {
      setIsLargeScreen(window.innerWidth >= 768);
      if (window.innerWidth >= 768) {
        setIsOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="relative md:w-[20%] z-40">
      {!isLargeScreen && (
        <button 
          className="fixed top-4 left-4 z-50 text-white text-3xl"
          onClick={() => setIsOpen(!isOpen)}
        >
          <i className={isOpen ? "ri-close-line" : "ri-menu-line"}></i>
        </button>
      )}

      <div className={`
        ${isLargeScreen ? "static block md:w-full" : "fixed top-0 left-0 w-[70%] sm:w-[50%] h-full z-40 transition-transform duration-300 ease-in-out"}
        ${isOpen || isLargeScreen ? "translate-x-0" : "-translate-x-full"}
        bg-[#1F1E24] border-r-2 border-zinc-400 p-10
      `}>
        <h1 className='text-xl text-white font-bold mb-10'>
          <i className="ri-tv-fill text-[#6556CD] text-2xl mr-3"></i>
          <span className='text-xl'>MoviesHub</span>
        </h1>

        <nav className='flex flex-col text-zinc-400 text-xl gap-3 mb-3'>
          <h1 className='text-white font-semibold text-xl mt-10 mb-5'>New Feeds</h1>
          <Link to="/trending" className='hover:bg-[#6556CD] hover:text-white duration-400 rounded-lg p-5'><i className="ri-fire-fill"></i> Trending</Link>
          <Link to="/popular" className='hover:bg-[#6556CD] hover:text-white duration-400 rounded-lg p-5'><i className="ri-bard-fill"></i> Popular</Link>
          <Link to="/movie" className='hover:bg-[#6556CD] hover:text-white duration-400 rounded-lg p-5'><i className="ri-movie-2-fill"></i> Movies</Link>
          <Link to="/tvshows" className='hover:bg-[#6556CD] hover:text-white duration-400 rounded-lg p-5'><i className="ri-tv-2-fill"></i> Tv Shows</Link>
          <Link to="/people" className='hover:bg-[#6556CD] hover:text-white duration-400 rounded-lg p-5'><i className="ri-team-fill"></i> People</Link>
        </nav>

        <hr className='border-none h-[1px] bg-zinc-400' />

        <nav className='flex flex-col text-zinc-400 text-xl gap-3'>
          <h1 className='text-white font-semibold text-xl mt-10 mb-5'>Website Information</h1>
          <Link to="/about" className='hover:bg-[#6556CD] hover:text-white duration-400 rounded-lg p-5'><i className="ri-information-fill"></i> About</Link>
          <Link to="/contact" className='hover:bg-[#6556CD] hover:text-white duration-400 rounded-lg p-5'><i className="ri-phone-fill"></i> Contact Us</Link>
        </nav>
      </div>

      {isOpen && !isLargeScreen && (
        <div 
          className="fixed inset-0 bg-black opacity-50 z-30"
          onClick={() => setIsOpen(false)}
        />
      )}
    </div>
  );
};

export default Sidenav;
