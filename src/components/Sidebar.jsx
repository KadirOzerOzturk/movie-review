import axios from 'axios';
import React, { useEffect, useState } from 'react';
import starIcon from "../icons/star_icon.png"

function Sidebar() {
    const [genres, setGenres] = useState([]);
    const [showGenres, setShowGenres] = useState([]);
    const [isShowAll, setIsShowAll] = useState(false);
    const [showText, setShowText] = useState("See All");
    const [topRatedMovies, setTopRatedMovies] = useState([]);

    useEffect(() => {
        const fetchMovies = async () => {
            try {
                const response = await axios.get('https://api.themoviedb.org/3/genre/movie/list?language=en', {
                    headers: {
                        accept: 'application/json',
                        Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJlYTdhNjU0M2Q5MjMxY2U5ODlkNWFiZDBkNDU0YzM3NSIsIm5iZiI6MTcyMTQ3NjMzNi41NTA2NzksInN1YiI6IjY2OWJhM2YxNDNhMGQxZmI5YTk1NDM4NCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.YNtaBeWYycRjv0_a9gWsL04CG4TnJxpIisdnRYQWor4'
                    }
                });
                setGenres(response.data.genres);
                setShowGenres(response.data.genres.slice(0, 10));
            } catch (error) {
                console.error("Error fetching genres:", error);
            }
        };

        fetchMovies();
        getTopRatedMovies();
    }, []);

    const handleGenres = () => {
        if (isShowAll) {
            setShowGenres(genres);
            setShowText("Hide");
        } else {
            setShowGenres(genres.slice(0, 10));
            setShowText("See All");
        }
        setIsShowAll(!isShowAll);
    }

    const getTopRatedMovies = async () => {
        try {
            const response = await axios.get(`https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1`, {
                headers: {
                    accept: 'application/json',
                    Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJlYTdhNjU0M2Q5MjMxY2U5ODlkNWFiZDBkNDU0YzM3NSIsIm5iZiI6MTcyMTQ3NjMzNi41NTA2NzksInN1YiI6IjY2OWJhM2YxNDNhMGQxZmI5YTk1NDM4NCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.YNtaBeWYycRjv0_a9gWsL04CG4TnJxpIisdnRYQWor4'
                }
            });
            setTopRatedMovies(response.data.results.slice(0, 10));
        } catch (error) {
            console.error("Error fetching movies:", error);
        }
    };

    return (
        <div className='bg-gray-800 p-6 z-10 min-h-screen h-full w-64 rounded-xl'>
            <div className='flex justify-between items-center'>
                <h1 className='text-slate-300 text-xl font-bold'>Genre</h1>
                <button onClick={handleGenres} className='px-3 py-1 bg-slate-600 rounded-xl text-white hover:bg-netflix-black'>{showText}</button>
            </div>
            <div className='grid grid-cols-2 pt-6 gap-x-2'>
                {showGenres.map((genre, index) => (
                    <ul key={index} className='pt-3'>
                        <li className='px-2 py-1 bg-slate-950 hover:bg-white hover:text-netflix-black cursor-pointer duration-200 rounded-xl text-white'>
                            {genre.name}
                        </li>
                    </ul>
                ))}
            </div>

            <h1 className='text-slate-300 text-xl font-bold mt-8 border-t-2 border-black py-8'>Top Rated</h1>
            <div>
                {topRatedMovies.map((movie, index) => (
                    <div key={index} className='flex gap-3'>
                        <img src={"http://image.tmdb.org/t/p/w500/" + movie.backdrop_path} alt="" className='h-24 w-20 object-cover mb-3 rounded-xl' />
                        <div>
                            <p className='text-white'>{movie.original_title}</p>
                            <div class="flex items-center">
                                <img src={starIcon} alt="" className='h-5 w-5' />
                                <p class="ms-2 text-sm font-bold text-white">{parseFloat(movie.vote_average.toFixed(1))}</p>
                                <span class="w-1 h-1 mx-1.5 bg-gray-500 rounded-full dark:bg-gray-400"></span>
                                <a href="#" class="text-sm font-medium  underline text-white text-nowrap">{movie.vote_count}</a>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Sidebar;