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
      <div className="container mx-auto lg:p-8 p-5">
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
                  <img src={`https://image.tmdb.org/t/p/w500/${list.profile_path}`} alt="poster" />
                  <div className="absolute z-40 bottom-0 left-0 right-0 h-full bg-gradient-to-t from-black">
                    <div className="absolute bottom-0 left-0 right-0 p-3">
                      <h2 className="font-bold text-base truncate">{list.name}</h2>
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
