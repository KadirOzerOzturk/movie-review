import axios from 'axios';
import React, { useCallback, useEffect, useState } from 'react';

function MovieCarousel() {
    const [movies, setMovies] = useState([]);
    const [currentSlide, setCurrentSlide] = useState(0);

    useEffect(() => {
        const fetchMovies = async () => {
            try {
                const response = await axios.get("https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc", {

                    headers: {
                        accept: 'application/json',
                        Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJlYTdhNjU0M2Q5MjMxY2U5ODlkNWFiZDBkNDU0YzM3NSIsIm5iZiI6MTcyMTQ3NjMzNi41NTA2NzksInN1YiI6IjY2OWJhM2YxNDNhMGQxZmI5YTk1NDM4NCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.YNtaBeWYycRjv0_a9gWsL04CG4TnJxpIisdnRYQWor4'
                    }
                });
                setMovies(response.data.results);
                movies.slice(0, 10)
            } catch (error) {
                console.error("Error fetching movies:", error);
            }
        };

        fetchMovies();
    }, []);
    function sliceOverview(str) {
        return str.length > 50 ? str.slice(0, 50) + '...' : str;
    }
    const handleNext = useCallback(() => {
        setCurrentSlide((prev) => (prev === movies.length - 1 ? 0 : prev + 1));
    }, [movies.length]);

    useEffect(() => {
        const interval = setInterval(handleNext, 3500); // 2 saniyede bir geçiş

        return () => clearInterval(interval); // Temizleme
    }, [handleNext]);

    return (
        <div className="relative w-full max-w-6xl mt-4 mx-auto " id="default-carousel" data-carousel="slide">
            <div className="relative h-56 overflow-hidden rounded-3xl  md:h-96">
                {movies.map((movie, index) => (
                    <div
                        key={index}
                        className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${index === currentSlide ? 'opacity-100' : 'opacity-0'}`}
                        data-carousel-item
                    >
                        <img
                            src={"http://image.tmdb.org/t/p/w500/" + movie.backdrop_path}
                            className="w-full h-full object-cover"
                            alt="Movie Backdrop"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent"></div>
                        <div className="absolute bottom-8 w-full bg-transparent flex items-center">
                            <div>
                                <p className="text-white text-3xl px-12">{movie.original_title}</p>

                                <p className="text-white text-lg px-12">{sliceOverview(movie.overview)}</p>

                            </div>
                            <div className='absolute bottom-8 right-1/4 '>
                                <button className='bg-netflix-red rounded-lg px-4 py-2 text-xl  text-white'>Overview </button>

                            </div>
                        </div>

                    </div>
                ))}
            </div>

            <div className="absolute z-30 flex -translate-x-1/2  left-1/2 space-x-3 rtl:space-x-reverse">
                {movies.map((_, index) => (
                    <button
                        key={index}
                        type="button"
                        className={`w-2 h-2 mt-3 rounded-full ${index === currentSlide ? 'bg-netflix-red' : 'bg-white'}`}
                        aria-current={index === currentSlide ? 'true' : 'false'}
                        aria-label={`Slide ${index + 1}`}
                        onClick={() => setCurrentSlide(index)}
                    ></button>
                ))}
            </div>

        </div>
    );
}

export default MovieCarousel;
