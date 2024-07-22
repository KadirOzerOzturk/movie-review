import axios from 'axios';
import React, { useEffect, useState } from 'react';
import arrowIcon from "../icons/arrow_icon.png"
import { useNavigate } from 'react-router-dom';

function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

function sliceStr(str) {
  return str.length > 18 ? str.slice(0, 15) + '...' : str;
}

function CategorizeMovies({ title }) {
  const [movies, setMovies] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const navigate=useNavigate()

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await axios.get(`https://api.themoviedb.org/3/movie/${title}?language=en-US&page=1`, {
          headers: {
            accept: 'application/json',
            Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJlYTdhNjU0M2Q5MjMxY2U5ODlkNWFiZDBkNDU0YzM3NSIsIm5iZiI6MTcyMTQ3NjMzNi41NTA2NzksInN1YiI6IjY2OWJhM2YxNDNhMGQxZmI5YTk1NDM4NCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.YNtaBeWYycRjv0_a9gWsL04CG4TnJxpIisdnRYQWor4'
          }
        });
        setMovies(response.data.results);
      } catch (error) {
        console.error("Error fetching movies:", error);
      }
    };

    fetchMovies();
  }, [title]);

  const nextSlide = () => {
    if (currentIndex < movies.length - 8) {
      setCurrentIndex(currentIndex + 8);
    }
  };

  const prevSlide = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 8);
    }
  };

  return (
    <div className='mt-8 '>
      <div className="flex justify-between items-center p-4">
        <h1 className='text-white'>{capitalize(title)}</h1>
        <div className='mr-8 flex'>
          <img src={arrowIcon} onClick={prevSlide} disabled={currentIndex === 0} className="mr-2 px-4 py-2 h-10 bg-gray-700 rotate-180 text-white rounded cursor-pointer hover:bg-gray-900"/>
          <img src={arrowIcon} onClick={nextSlide} disabled={currentIndex >= movies.length - 8} className="px-4 py-2 h-10 bg-gray-700 text-white rounded cursor-pointer hover:bg-gray-900"/>
        </div>
      </div>
      <ul className='flex gap-4'>
        {movies.slice(currentIndex, currentIndex + 8).map((movie, index) => (
          <li onClick={()=>navigate(`/${movie.id}`)} key={index} className='relative w-48 h-72 cursor-pointer'>
            <img
              src={"http://image.tmdb.org/t/p/w500/" + movie.backdrop_path}
              className="w-full h-full object-cover rounded-lg"
              alt="Movie Backdrop"
            />
            <div className='absolute bottom-0 left-0 w-full h-12 bg-gray-800 bg-opacity-50 flex items-center'>
              <p className='text-white text-lg px-2'>{sliceStr(movie.original_title)}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default CategorizeMovies;
