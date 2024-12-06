import { useEffect, useState } from 'react';
import { getPopularMovies, findGenre } from '../services/tmdbApi';

const PopularMovie = () => {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    getPopularMovies(1).then((result) => {
      setMovies(result);
    });
  }, []);

  return (
    <>
      <div>
        <div className="container mx-auto lg:p-8 p-5">
          <h1 className="text-lg font-bold mb-5">Popular Of The Week</h1>
          <div className="flex justify-center items-center flex-wrap lg:gap-10 md:gap-5 gap-3">
            {movies.length > 0 &&
              movies.map((movie, i) => (
                <div className="relative w-[48%] lg:w-[12%] md:w-[30%] overflow-hidden rounded-lg h-full hover:scale-110 hover:duration-300 cursor-pointer" key={i}>
                  <img className=" w-full " src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`} alt="poster" />
                  <div className="absolute bottom-0 left-0 right-0 top-0 bg-gradient-to-t from-black">
                    <div className="absolute bottom-0 left-0 right-0 lg:px-3 lg:py-5 p-2">
                      <h2 className="text-sm md:text-base font-bold shadow-sm truncate">{movie.title}</h2>
                      <div className="flex flex-wrap gap-1 items-center text-xs mb-2 text-dark-typo2">
                        <div className="flex items-center gap-1 text-xs">
                          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-4 fill-yellow-500">
                            <path
                              fillRule="evenodd"
                              d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.005Z"
                              clipRule="evenodd"
                            />
                          </svg>
                          <p>{movie.vote_average}</p>
                        </div>
                        <div>• {findGenre(movie.genre_ids[0]).name}</div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
          </div>
          {/* shw more */}
          {/* <div className="flex flex-col lg:flex-row gap-3 text-sm md:text-base">
            <button className="py-2.5 px-8 border-2 border-dark-primary text-dark-primary rounded-lg" onClick={() => showMore()}>
              Show More
            </button>
          </div> */}
        </div>
      </div>
    </>
  );
};

export default PopularMovie;
