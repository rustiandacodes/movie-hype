import React, { useEffect, useState } from 'react';
import { getVideos, getCredit, getSimilarMovie, getDetail, findGenre } from '../services/tmdbApi';
import { useParams } from 'react-router-dom';

const Detail = () => {
  let params = useParams();
  console.log(params.id);
  const [detail, setDetail] = useState([]);
  const [genres, setGenres] = useState([]);
  const [trailer, setTrailel] = useState([]);
  const [credit, setCredit] = useState([]);
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
      setCredit(result);
    });
    getSimilarMovie(params.id).then((result) => {
      setSimilar(result);
    });
    console.log(detail);
  }, []);

  const timeConvert = (n) => {
    const num = n;
    const hours = num / 60;
    const rhours = Math.floor(hours);
    const minutes = (hours - rhours) * 60;
    const rminutes = Math.round(minutes);
    return rhours + 'h ' + rminutes + 'm';
  };

  return (
    <>
      <div>
        <div className="relative lg:h-[40rem] h-[48rem] overflow-hidden">
          <img className="lg:w-screen blur-md h-screen hidden md:block" src={`https://image.tmdb.org/t/p/w500/${detail.backdrop_path}`} alt="poster" />
          <div className="absolute h-screen bg-black top-0 right-0 left-0 opacity-80 hidden md:block"></div>
        </div>
        <div className="absolute top-0 left-0 right-0 lg:py-32 lg:px-52 container mx-auto flex flex-col justify-center items-center lg:flex-row lg:gap-10 gap-5">
          <img className="lg:h-96 lg:rounded-lg" src={`https://image.tmdb.org/t/p/w500/${detail.poster_path}`} alt="poster" />
          <div className="px-5">
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
            <button className="bg-dark-primary p-3 rounded-lg flex items-center justify-center gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.91 11.672a.375.375 0 0 1 0 .656l-5.603 3.113a.375.375 0 0 1-.557-.328V8.887c0-.286.307-.466.557-.327l5.603 3.112Z" />
              </svg>
              <span>Watch Trailer</span>
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Detail;
