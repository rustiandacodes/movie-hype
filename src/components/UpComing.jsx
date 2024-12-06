import React, { useEffect, useState } from 'react';
import { getUpComingMovies } from '../services/tmdbApi';

const UpComing = () => {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    getUpComingMovies().then((result) => {
      setMovies(result);
    });
    console.log(movies);
  }, []);
  return (
    <>
      <div className="container mx-auto lg:p-8 p-5">
        <h1 className="text-lg font-bold mb-5">Up Coming</h1>
      </div>
    </>
  );
};

export default UpComing;
