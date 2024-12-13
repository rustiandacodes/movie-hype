import React, { useEffect, useState } from 'react';
import { getPopularArtist } from '../services/tmdbApi';
import { Swiper, SwiperSlide } from 'swiper/react';
import { A11y, Navigation } from 'swiper/modules';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';

const PopularArtist = () => {
  const [artist, SetArtist] = useState([]);

  useEffect(() => {
    getPopularArtist().then((result) => {
      SetArtist(result);
    });
  }, []);

  return (
    <>
      <div className="lg:px-20 p-5">
        <h1 className="text-lg font-bold mb-5">Popular Artist</h1>
        <Swiper
          modules={[A11y, Navigation]}
          spaceBetween={0}
          breakpoints={{
            350: {
              slidesPerView: 3,
              spaceBetween: 15,
            },
            768: {
              slidesPerView: 5,
              spaceBetween: 15,
            },
            1024: {
              slidesPerView: 6,
              spaceBetween: 15,
            },
            1440: {
              slidesPerView: 10,
              spaceBetween: 15,
            },
          }}
          navigation={{
            clickable: true,
          }}
          scrollbar={{ draggable: true }}
          onSwiper={(swiper) => console.log(swiper)}
          onSlideChange={() => console.log('slide change')}
          style={{ '--swiper-pagination-color': '#FFFF', '--swiper-pagination-bullet-inactive-color': '#999999', '--swiper-navigation-color': '#FFFF' }}
        >
          {artist.length > 0 &&
            artist.map((list, i) => (
              <SwiperSlide key={i}>
                <div className="relative rounded-lg overflow-hidden">
                  {list.profile_path ? (
                    <img src={`https://image.tmdb.org/t/p/w500/${list.profile_path}`} alt="poster" />
                  ) : (
                    <div className="flex justify-center items-center h-full">
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-20">
                        <path
                          fillRule="evenodd"
                          d="M7.5 6a4.5 4.5 0 1 1 9 0 4.5 4.5 0 0 1-9 0ZM3.751 20.105a8.25 8.25 0 0 1 16.498 0 .75.75 0 0 1-.437.695A18.683 18.683 0 0 1 12 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 0 1-.437-.695Z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                  )}

                  <div className="absolute z-40 bottom-0 left-0 right-0 h-full bg-gradient-to-t from-black">
                    <div className="absolute bottom-0 left-0 right-0 p-3">
                      <h2 className="font-bold text-sm truncate">{list.name}</h2>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            ))}
        </Swiper>
      </div>
    </>
  );
};

export default PopularArtist;
