import React, { useEffect, useState } from 'react';
import { getPopularArtist } from '../services/tmdbApi';

const PopularArtist = () => {
  const [artist, SetArtist] = useState([]);

  //   useEffect(() => {
  //     getPopularArtist().then((result) => {
  //       SetArtist(result);
  //     });
  //     console.log(artist);
  //   }, []);

  return (
    <>
      <div className="bg-dark-bg">
        <div className="container mx-auto lg:p-8 p-5">
          <h1 className="text-lg font-bold mb-5">Popular Artist</h1>
          {/* <div>{artist.length > 0 && artist.map((list, i) > <div>{list.name}</div>)}</div> */}
        </div>
      </div>
    </>
  );
};

export default PopularArtist;
