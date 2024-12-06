// import React, { useEffect, useState } from 'react';
// import { getPopularArtist } from '../services/tmdbApi';

import Heroes from '../components/Heroes';
import TopRated from '../components/TopRated';
import PopularMovie from '../components/PopularMovie';
import PopularArtist from '../components/PopularArtist';
import UpComing from '../components/UpComing';

const Home = () => {
  // const [movies, setMovies] = useState([]);

  // useEffect(() => {
  //   getPopularArtist().then((result) => {
  //     setMovies(result);
  //   });
  //   console.log(movies);
  // }, []);

  return (
    <>
      <Heroes />
      <TopRated />
      <PopularMovie />
      {/* <UpComing /> */}
      <PopularArtist />
    </>
  );
};

export default Home;
