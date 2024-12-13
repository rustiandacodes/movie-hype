import React, { useEffect, useState } from 'react';
import { getDiscoverMovies, findGenre } from '../services/tmdbApi';
import { useNavigate } from 'react-router-dom';

const Discover = () => {
  const [page, setPage] = useState(4);
  const [movies, setMovies] = useState([]);
  let navigate = useNavigate();

  useEffect(() => {
    getDiscoverMovies(2).then((result) => {
      setMovies(result);
    });
  }, []);

  const showMore = async () => {
    setPage(page + 1);
    const movie = await getDiscoverMovies(page);
    setMovies(movies.concat(movie));
  };
  return (
    <>
      <div className="md:py-32 p-20 px-5">
        <div className="grid xl:grid-cols-10 md:grid-cols-5 lg:grid-cols-8 grid-cols-2 gap-4">
          {movies.length > 0 &&
            movies.map((movie, i) => (
              <div
                onClick={() => {
                  navigate(`/detail/${movie.id}`);
                }}
                className="relative overflow-hidden rounded-lg h-full hover:scale-110 hover:duration-300 cursor-pointer"
                key={i}
              >
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
                      <div className="hidden md:block">• {findGenre(movie.genre_ids[0]).name}</div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
        </div>
        <div className="absolute -mt-[25rem] right-0 left-0 w-full h-[25rem] gradient-hero">
          <div className="flex justify-center items-baseline lg:flex-row py-10 text-sm md:text-base">
            <button className="py-2.5 px-8 border-2 border-dark-primary text-dark-primary mt-48 rounded-lg" onClick={() => showMore()}>
              Show More
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Discover;
