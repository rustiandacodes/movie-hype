import React, { useEffect, useState } from 'react';
import { getVideos, getCredit, getSimilarMovie, getDetail, findGenre } from '../services/tmdbApi';
import { useParams, useNavigate } from 'react-router-dom';

import { Swiper, SwiperSlide } from 'swiper/react';
import { A11y, Navigation } from 'swiper/modules';

import YoutubePlayer from '../components/YoutubePlayer';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';

const Detail = () => {
  let params = useParams();
  let navigate = useNavigate();
  const [watchTrailer, setWatchTrailer] = useState(false);
  const [detail, setDetail] = useState([]);
  const [genres, setGenres] = useState([]);
  const [trailer, setTrailel] = useState([]);
  const [credit, setCredit] = useState([]);
  const [director, setDirector] = useState([]);
  const [similar, setSimilar] = useState([]);

  useEffect(() => {
    getDetail(params.id).then((result) => {
      setDetail(result);
    });
    getDetail(params.id).then((result) => {
      setGenres(result.genres);
    });
    getVideos(params.id).then((result) => {
      setTrailel(result.videos.results[0].key);
    });
    getCredit(params.id).then((result) => {
      setCredit(result.cast);
    });
    getCredit(params.id).then((result) => {
      let directors = result.crew.find((item) => item.job === 'Director');
      let writers = result.crew.find((item) => item.job === 'Writer');
      setDirector(directors);
      setWriter(writers);
    });
    getSimilarMovie(params.id).then((result) => {
      setSimilar(result);
    });
  }, []);

  const timeConvert = (n) => {
    const num = n;
    const hours = num / 60;
    const rhours = Math.floor(hours);
    const minutes = (hours - rhours) * 60;
    const rminutes = Math.round(minutes);
    return rhours + 'h ' + rminutes + 'm';
  };

  const handlePage = (id) => {
    navigate(`/detail/${id}`);
    window.location.reload();
  };

  return (
    <>
      <div>
        <div className="relative lg:h-[40rem] overflow-hidden">
          <img className="lg:w-screen blur-md h-screen hidden md:block" src={`https://image.tmdb.org/t/p/w500/${detail.backdrop_path}`} alt="poster" />
          <div className="absolute h-screen bg-black top-0 right-0 left-0 opacity-80 md:block hidden"></div>
        </div>
        <div className="absolute top-0 md:top-24 lg:top-0 left-0 right-0 lg:py-32 lg:px-52 container mx-auto flex flex-col justify-center items-center md:flex-row lg:gap-10 gap-5">
          <img className="lg:h-96 md:h-[35rem] md:rounded-lg hidden md:block" src={`https://image.tmdb.org/t/p/w500/${detail.poster_path}`} alt="poster" />
          {/* descriptiom desktop */}
          <div className="px-5 hidden md:block">
            <p className="text-2xl font-bold mb-1">{detail.title}</p>
            <div className="flex items-center gap-2 mb-3 text-sm flex-wrap">
              <div className="flex items-center gap-1">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-4 fill-yellow-500">
                  <path
                    fillRule="evenodd"
                    d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.005Z"
                    clipRule="evenodd"
                  />
                </svg>
                <p>{detail.vote_average}</p>
              </div>
              • <p>{detail.release_date}</p> • {genres.length > 0 && genres.map((genre, i) => <span key={i}>{genre.name} •</span>)}
              <p>{timeConvert(detail.runtime)}</p>
            </div>
            <p className={`italic mb-1 ${detail.tagline === '' ? 'hidden' : 'block'} text-gray-300`}>"{detail.tagline}"</p>
            <p className="font-bold text-lg mb-1">Overview</p>
            <p className="mb-5 text-sm md:text-base">{detail.overview}</p>
            <div className="mt-8  items-center gap-10 hidden md:flex">
              <button
                onClick={() => {
                  setWatchTrailer(true);
                }}
                className="bg-dark-primary p-3 rounded-lg flex items-center justify-center gap-2"
              >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15.91 11.672a.375.375 0 0 1 0 .656l-5.603 3.113a.375.375 0 0 1-.557-.328V8.887c0-.286.307-.466.557-.327l5.603 3.112Z" />
                </svg>
                <span>Watch Trailer</span>
              </button>
              {director ? (
                <div>
                  <p className="text-lg font-bold cursor-pointer hover:opacity-50 hover:duration-300">{director.name}</p>
                  <p className="text-sm">Director</p>
                </div>
              ) : (
                ''
              )}

              <div className="flex gap-2 items-center cursor-pointer hover:opacity-50 hover:duration-300">
                <div className="text-end text-sm">
                  <p>Crew and</p>
                  <p>Other Cast</p>
                </div>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
                </svg>
              </div>
            </div>
          </div>
        </div>

        <div className="mb-10">
          <img className="lg:h-96 lg:rounded-lg md:hidden" src={`https://image.tmdb.org/t/p/w500/${detail.poster_path}`} alt="poster" />
          {/* description phone */}
          <div className="container mx-auto px-5 md:hidden py-8">
            {/* description */}
            <p className="text-2xl font-bold mb-1">{detail.title}</p>
            <div className="flex items-center gap-2 mb-3 text-sm flex-wrap">
              <div className="flex items-center gap-1">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-4 fill-yellow-500">
                  <path
                    fillRule="evenodd"
                    d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.005Z"
                    clipRule="evenodd"
                  />
                </svg>
                <p>{detail.vote_average}</p>
              </div>
              • <p>{detail.release_date}</p> • {genres.length > 0 && genres.map((genre, i) => <span key={i}>{genre.name},</span>)}•<p>{timeConvert(detail.runtime)}</p>
            </div>
            <p className={`italic mb-1 ${detail.tagline === '' ? 'hidden' : 'block'} text-gray-300`}>"{detail.tagline}"</p>
            <p className="font-bold text-lg mb-1">Overview</p>
            <p className="mb-5 text-sm md:text-base">{detail.overview}</p>
            <button
              onClick={() => {
                setWatchTrailer(true);
              }}
              className="bg-dark-primary p-3 rounded-lg flex items-center justify-center gap-2"
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.91 11.672a.375.375 0 0 1 0 .656l-5.603 3.113a.375.375 0 0 1-.557-.328V8.887c0-.286.307-.466.557-.327l5.603 3.112Z" />
              </svg>
              <span>Watch Trailer</span>
            </button>
          </div>
          {/* trailer */}
          <div className={`container mx-auto ${watchTrailer ? 'block' : 'hidden'} md:px-20 bg-black md:mt-10 flex justify-center`}>
            <iframe
              class="md:w-[80%] w-full aspect-video"
              src={`https://www.youtube.com/embed/${trailer}`}
              frameborder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowfullscreen
            ></iframe>
          </div>

          <div className="container mx-auto px-5 md:py-10 md:hidden">
            <div className="flex gap-5 my-10">
              {director ? (
                <div className="relative rounded-lg overflow-hidden w-[40%] lg:w-[9%] md:w-[30%]  h-full hover:scale-110 hover:duration-300 cursor-pointer">
                  <img src={`https://image.tmdb.org/t/p/w500/${director.profile_path}`} alt="poster" />
                  <div className="absolute z-40 bottom-0 left-0 right-0 h-full bg-gradient-to-t from-black">
                    <div className="absolute bottom-0 left-0 right-0 p-3">
                      <h2 className="font-bold md:text-base text-sm truncate">{director.name}</h2>
                      <h2 className="md:text-sm text-xs truncate">Director</h2>
                    </div>
                  </div>
                </div>
              ) : (
                ''
              )}

              <div className="flex gap-2 items-center cursor-pointer hover:opacity-50 hover:duration-300 px-5 mb-5">
                <div className="text-end text-base underline">
                  <p>Crew and</p>
                  <p>Other Cast</p>
                </div>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
                </svg>
              </div>
            </div>
          </div>

          {/* cast */}
          <div className="container mx-auto px-5 md:py-10">
            <h1 className="text-lg font-bold mb-5">Featured Cast</h1>
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
              style={{ '--swiper-pagination-color': '#FFFF', '--swiper-pagination-bullet-inactive-color': '#999999', '--swiper-navigation-color': '#FFFF' }}
            >
              {credit.length > 0 &&
                credit.map((list, i) => (
                  <SwiperSlide key={i}>
                    <div className="relative rounded-lg overflow-hidden flex justify-center items-center md:h-[22vh] h-[18vh]">
                      {list.profile_path ? (
                        <img src={`https://image.tmdb.org/t/p/w500/${list.profile_path}`} alt="poster" />
                      ) : (
                        <div className="flex justify-center items-center">
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
                          <h2 className="font-bold md:text-base text-sm truncate">{list.name}</h2>
                          <h2 className="md:text-sm text-xs truncate">{list.character}</h2>
                        </div>
                      </div>
                    </div>
                  </SwiperSlide>
                ))}
            </Swiper>
          </div>
          {/* Similar Movie */}
          <div className="container mx-auto px-5 py-10 md:py-0">
            <h1 className="text-lg font-bold mb-5">Recomendations</h1>
            <div className="flex justify-around items-center flex-wrap lg:gap-2 md:gap-5 gap-3 h-full">
              {similar.length > 0 &&
                similar.map((movie, i) => (
                  <div
                    onClick={() => {
                      handlePage(movie.id);
                    }}
                    className="relative w-[48%] lg:w-[9%] md:w-[30%] overflow-hidden rounded-lg hover:scale-110 hover:duration-300 cursor-pointer"
                    key={i}
                  >
                    {movie.poster_path ? (
                      <img className="w-full " src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`} alt="poster" />
                    ) : (
                      <div className="flex justify-center items-center lg:h-[24vh] h-[30vh]">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-20">
                          <path
                            fillRule="evenodd"
                            d="M1.5 6a2.25 2.25 0 0 1 2.25-2.25h16.5A2.25 2.25 0 0 1 22.5 6v12a2.25 2.25 0 0 1-2.25 2.25H3.75A2.25 2.25 0 0 1 1.5 18V6ZM3 16.06V18c0 .414.336.75.75.75h16.5A.75.75 0 0 0 21 18v-1.94l-2.69-2.689a1.5 1.5 0 0 0-2.12 0l-.88.879.97.97a.75.75 0 1 1-1.06 1.06l-5.16-5.159a1.5 1.5 0 0 0-2.12 0L3 16.061Zm10.125-7.81a1.125 1.125 0 1 1 2.25 0 1.125 1.125 0 0 1-2.25 0Z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </div>
                    )}

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
                          <div>• {movie.genre_ids.length > 0 ? findGenre(movie.genre_ids[0]).name : ''}</div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Detail;
