import React from "react";

const About = () => {
  return (
     <section className="w-[100vw] min-h-screen px-6 py-16 flex items-center justify-center">
      <div className="max-w-4xl mx-auto text-center">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-zinc-400 mb-6">
          About MoviesHub
        </h1>
        <p className="text-base sm:text-lg md:text-xl text-gray-600 leading-relaxed">
          Welcome to <span className="font-semibold text-red-600">MoviesHub</span> — your all-in-one platform for discovering, exploring, and tracking the world of movies and TV shows.
          Whether you’re a weekend movie buff, a late-night binge-watcher, or someone who loves diving into behind-the-scenes details, MoviesHub is made just for you.
          <br /><br />
          Inspired by platforms like IMDb but reimagined with a modern, user-friendly design, we provide access to ratings, cast and crew information, reviews, trailers, and recommendations. 
          Stay updated with the latest blockbusters, trending series, and hidden gems.
          <br /><br />
          From action-packed thrillers to heartfelt dramas and hilarious comedies — MoviesHub brings all genres under one roof. Create your personal watchlist, rate what you've seen, and never miss a story again.
          <br /><br />
          At MoviesHub, we believe that every story deserves to be seen and every viewer deserves a platform that makes exploring entertainment effortless and enjoyable.
        </p>
      </div>
    </section>
  );
};

export default About;
