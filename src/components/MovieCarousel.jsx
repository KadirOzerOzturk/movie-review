import axios from 'axios';
import React, { useCallback, useEffect, useState } from 'react';

function MovieCarousel() {
    const [movies, setMovies] = useState([]);
    const [currentSlide, setCurrentSlide] = useState(0);

    useEffect(() => {
        const fetchMovies = async () => {
            try {
                const response = await axios.get("https://streaming-availability.p.rapidapi.com/shows/search/filters", {
                    params: {
                        country: 'us',
                        series_granularity: 'show',
                        order_direction: 'asc',
                        order_by: 'original_title',
                        genres_relation: 'and',
                        output_language: 'en',
                        show_type: 'movie'
                      },
                    
                    headers: {
                        'x-rapidapi-key': '178a257899mshdbb6553358cc760p15e847jsn5eeebd79508b',
                        'x-rapidapi-host': 'streaming-availability.p.rapidapi.com'
                    }
                });
                setMovies(response.data.shows);
                console.log("size" + movies.length())
                movies.slice(0, 10)
            } catch (error) {
                console.error("Error fetching movies:", error);
            }
        };

        fetchMovies();
    }, []);

    const handleNext = useCallback(() => {
        setCurrentSlide((prev) => (prev === movies.length - 1 ? 0 : prev + 1));
    }, [movies.length]);

    useEffect(() => {
        const interval = setInterval(handleNext, 3500); // 2 saniyede bir geçiş

        return () => clearInterval(interval); // Temizleme
    }, [handleNext]);

    return (
        <div className="relative w-full max-w-3xl   mx-auto" id="default-carousel" data-carousel="slide">
            <div className="relative h-56 overflow-hidden rounded-lg md:h-96">
                {movies.map((movie, index) => (
                    <div
                        key={index}
                        className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${index === currentSlide ? 'opacity-100' : 'opacity-0'}`}
                        data-carousel-item
                    >
                        <img
                            src={movie.imageSet.horizontalPoster.w480}
                            className="w-full h-full object-cover"
                            alt="Movie Backdrop"
                        />
                    </div>
                ))}
            </div>

            <div className="absolute z-30 flex -translate-x-1/2  left-1/2 space-x-3 rtl:space-x-reverse">
                {movies.map((_, index) => (
                    <button
                        key={index}
                        type="button"
                        className={`w-2 h-2 mt-3 rounded-full ${index === currentSlide ? 'bg-blue-600' : 'bg-white'}`}
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
