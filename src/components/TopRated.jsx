import { useEffect, useState } from 'react';
import { getTopRatedMovies, findGenre } from '../services/tmdbApi';
import { A11y, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import { useNavigate } from 'react-router-dom';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';

const TopRated = () => {
  const [movies, setMovies] = useState([]);
  let navigate = useNavigate();

  useEffect(() => {
    getTopRatedMovies().then((result) => {
      setMovies(result.slice(0, 10));
    });
  }, []);

  return (
    <>
      <div className="bg-dark-bg">
        <div className="lg:px-20 p-5">
          <h1 className="text-lg font-bold mb-5">Top Rated</h1>
          <Swiper
            modules={[A11y, Pagination]}
            spaceBetween={0}
            breakpoints={{
              350: {
                slidesPerView: 1,
                spaceBetween: 15,
              },
              768: {
                slidesPerView: 2,
                spaceBetween: 15,
              },
              1024: {
                slidesPerView: 4,
                spaceBetween: 15,
              },
            }}
            pagination={{
              clickable: true,
            }}
            autoplay
            scrollbar={{ draggable: true }}
            onSwiper={(swiper) => console.log(swiper)}
            onSlideChange={() => console.log('slide change')}
            style={{ '--swiper-pagination-color': '#FFFF', '--swiper-pagination-bullet-inactive-color': '#999999', '--swiper-navigation-color': '#FFFF' }}
          >
            {movies.length > 0 &&
              movies.map((movie, i) => (
                <SwiperSlide key={i}>
                  <div
                    onClick={() => {
                      navigate(`/detail/${movie.id}`);
                    }}
                    className="flex items-center px-5 py-8 gap-2 bg-dark-unit rounded-lg overflow-hidden cursor-pointer"
                  >
                    <p className="font-semibold text-5xl">{i + 1}</p>
                    <img className="h-[8rem] w-[5rem] rounded-lg" src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`} alt="poster" />
                    <div>
                      <h2 className="text-base font-bold w-fit">{movie.title}</h2>
                      <div className="flex flex-wrap gap-1 items-center text-xs mb-2 text-dark-typo2">
                        {movie.genre_ids.map((genre, i) => (
                          <div key={i}>• {findGenre(genre).name}</div>
                        ))}
                      </div>
                      <div className="flex items-center gap-2 text-xs">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-4 fill-yellow-500">
                          <path
                            fillRule="evenodd"
                            d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.005Z"
                            clipRule="evenodd"
                          />
                        </svg>
                        <p>{movie.vote_average}</p>
                      </div>
                    </div>
                  </div>
                </SwiperSlide>
              ))}
          </Swiper>
        </div>
      </div>
    </>
  );
};

export default TopRated;
