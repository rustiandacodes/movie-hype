import React, { useEffect, useState } from 'react';
import { getPopularArtist } from '../services/tmdbApi';

const PopularArtist = () => {
  const [artist, SetArtist] = useState([]);

  useEffect(() => {
    getPopularArtist().then((result) => {
      SetArtist(result);
    });
  }, []);

  return (
    <>
      <div className="">
        <div className="container mx-auto lg:p-8 p-5">
          <h1 className="text-lg font-bold mb-5">Popular Artist</h1>
          <div className="flex justify-around flex-wrap">
            {artist.length > 0 &&
              artist.map((list, i) => (
                <div className="md:w-40 w-28 hover:scale-110 hover:duration-300" key={i}>
                  <div className="p-2 bg-dark-unit2 mb-3 rounded-lg">
                    <img src={`https://image.tmdb.org/t/p/w500/${list.profile_path}`} alt="profile" />
                    <h2 className="mt-2 truncate font-bold text-center">{list.name}</h2>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default PopularArtist;
