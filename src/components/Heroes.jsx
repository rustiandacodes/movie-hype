import { getNowPlayingMovies, findGenre } from '../services/tmdbApi';
import { A11y, Autoplay } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import { useEffect, useState } from 'react';

const Heroes = () => {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    getNowPlayingMovies().then((result) => {
      setMovies(result);
    });
  }, []);

  return (
    <>
      <Swiper
        modules={[A11y, Autoplay]}
        spaceBetween={0}
        slidesPerView={1}
        autoplay
        scrollbar={{ draggable: true }}
        onSwiper={(swiper) => console.log(swiper)}
        onSlideChange={() => console.log('slide change')}
        style={{ '--swiper-pagination-color': '#FFFF', '--swiper-pagination-bullet-inactive-color': '#999999', '--swiper-navigation-color': '#FFFF' }}
      >
        {movies.length > 0 &&
          movies.map((movie, i) => (
            <SwiperSlide key={i}>
              {/* poster */}
              <div className="h-screen lg:h-[28rem] gap-5 flex lg:flex-row-reverse justify-center items-center bg-dark-bg ">
                <div className="h-full lg:w-[50%] relative">
                  <div className="hidden lg:block absolute right-0 left-0 bottom-0 h-screen bg-gradient-to-r lg:bg-gradient-to-r from-dark-bg z-30"></div>
                  <div className="lg:hidden block absolute right-0 left-0 bottom-0 h-screen gradient-hero z-30"></div>
                  <img className="lg:hidden w-screen" src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`} alt="poster" />
                  <img className="hidden lg:block w-screen lg:w-full lg:h-full" src={`https://image.tmdb.org/t/p/w500/${movie.backdrop_path}`} alt="poster" />
                </div>
                {/* description */}
                <div className="absolute bottom-0 w-full p-5 md:px-10 z-40 lg:static lg:w-[50%]">
                  <div className="lg:p-[4.5rem] p-0">
                    <p className="font-bold text-2xl md:text-4xl mb-2">{movie.title}</p>
                    <div className="flex flex-wrap gap-2 items-center text-sm md:text-base mb-2 text-dark-typo2">
                      <p>{movie.release_date.slice(0, 4)}</p>
                      {movie.genre_ids.map((genre, i) => (
                        <span key={i}>• {findGenre(genre).name}</span>
                      ))}
                    </div>
                    <p className="mb-5 text-sm md:text-base">{movie.overview.slice(0, 150)} ...</p>
                    <div className="flex flex-col lg:flex-row gap-3 text-sm md:text-base">
                      <button className="bg-dark-primary p-3 rounded-lg flex items-center justify-center gap-2">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                          <path strokeLinecap="round" strokeLinejoin="round" d="M15.91 11.672a.375.375 0 0 1 0 .656l-5.603 3.113a.375.375 0 0 1-.557-.328V8.887c0-.286.307-.466.557-.327l5.603 3.112Z" />
                        </svg>
                        <span>Watch Trailer</span>
                      </button>
                      <button className="py-2.5 px-8 border-2 border-dark-primary text-dark-primary rounded-lg">View Detail</button>
                    </div>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
      </Swiper>
    </>
  );
};

export default Heroes;
