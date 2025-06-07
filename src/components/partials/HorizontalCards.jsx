import React from "react";
import Slider from "react-slick";
import Dropdown from "./Dropdown";
import noImage from "/noImage.png"
import { Link } from "react-router-dom";
const HorizontalCards = ({ data }) => {
  var settings = {
    dots: false, 
    arrows: false, 
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 4,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: false
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ]
  };

  return (
      
      <Slider {...settings} className="">
        {data.map((d, i) => (
          <Link to = {`/${d.media_type}/details/${d.id}`} key={i} className="px-2">
            <div className="bg-zinc-900 rounded overflow-hidden shadow-lg h-[350px] flex flex-col">
              <img
                className="w-full h-[50%] object-cover"
                src={d.backdrop_path || d.poster_path ? `https://image.tmdb.org/t/p/original/${d.backdrop_path || d.poster_path}` : noImage}
                alt=""
              />
              <div className="p-4 text-white h-[50%] flex flex-col">
                <h2 className="text-lg font-semibold text-yellow-600 pb-2">
                  {d.name || d.title || d.original_name || d.original_title}
                </h2>
                <p className="text-sm">
                  {d.overview.slice(0, 70)}...
                  <span className="text-zinc-500">more</span>
                </p>
              </div>
            </div>
          </Link>
        ))}
      </Slider>

  );
};

export default HorizontalCards;
