import axios from 'axios';

const baseUrl = 'https://api.themoviedb.org/3/movie';
const apiKey = 'fc09c7946adc53bb58eb160030e364ac';

export const baseImgUrl = 'https://image.tmdb.org/t/p/w500/';

const genres = [
  {
    id: 28,
    name: 'Action',
  },
  {
    id: 12,
    name: 'Adventure',
  },
  {
    id: 16,
    name: 'Animation',
  },
  {
    id: 35,
    name: 'Comedy',
  },
  {
    id: 80,
    name: 'Crime',
  },
  {
    id: 99,
    name: 'Documentary',
  },
  {
    id: 18,
    name: 'Drama',
  },
  {
    id: 10751,
    name: 'Family',
  },
  {
    id: 14,
    name: 'Fantasy',
  },
  {
    id: 36,
    name: 'History',
  },
  {
    id: 27,
    name: 'Horror',
  },
  {
    id: 10402,
    name: 'Music',
  },
  {
    id: 9648,
    name: 'Mystery',
  },
  {
    id: 10749,
    name: 'Romance',
  },
  {
    id: 878,
    name: 'Science Fiction',
  },
  {
    id: 10770,
    name: 'TV Movie',
  },
  {
    id: 53,
    name: 'Thriller',
  },
  {
    id: 10752,
    name: 'War',
  },
  {
    id: 37,
    name: 'Western',
  },
];

export const getNowPlayingMovies = async (page = 1) => {
  const movies = await axios.get(`${baseUrl}/now_playing?language=en-US&page=${page}&api_key=${apiKey}`);
  return movies.data.results;
};

export const getPopularMovies = async (page = 1) => {
  const movies = await axios.get(`${baseUrl}/popular?language=en-US&page=${page}&api_key=${apiKey}`);
  return movies.data.results;
};
export const getDiscoverMovies = async (page = 1) => {
  const movies = await axios.get(` https://api.themoviedb.org/3/discover/movie?language=en-US&page=${page}&api_key=${apiKey}`);
  return movies.data.results;
};

export const getTopRatedMovies = async (page = 1) => {
  const movies = await axios.get(`${baseUrl}/top_rated?language=en-US&page=${page}&api_key=${apiKey}`);
  return movies.data.results;
};

export const getUpComingMovies = async (page = 1) => {
  const movies = await axios.get(`${baseUrl}/upcoming?language=en-US&page=${page}&api_key=${apiKey}`);
  return movies.data.results;
};

export const getDetailMovie = async (movie_id) => {
  const movies = await axios.get(`${baseUrl}/${movie_id}videos?api_key=${apiKey}&append_to_response=videos`);
  return movies;
};

export const getReviews = async (movie_id) => {
  const movies = await axios.get(`${baseUrl}/${movie_id}/reviews?language=en-US&page=1&api_key=${apiKey}`);
  return movies.data.results;
};

export const getSimilarMovie = async (movie_id) => {
  const movies = await axios.get(`${baseUrl}/${movie_id}/similar?language=en-US&page=1&api_key=${apiKey}`);
  return movies.data.results;
};

export const getGenre = async () => {
  const movies = await axios.get(`https://api.themoviedb.org/3/genre/movie/list?api_key=${apiKey}`);
  return movies.data;
};
export const getPopularArtist = async () => {
  const person = await axios.get(` https://api.themoviedb.org/3/person/popular?api_key=${apiKey}`);
  return person.data.results;
};

export const findGenre = (id) => {
  let res = genres.find((item) => item.id === id);
  return res;
};
