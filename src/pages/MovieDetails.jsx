import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import Loading from '../components/Loading';
import starIcon from "../icons/star_icon.png"

function MovieDetails() {
    const location = useLocation();
    const navigate = useNavigate();
    const movieId = location.pathname.split("/").pop();
    const [movie, setMovie] = useState({})
    const [reviews, setReviews] = useState([])
    const [pendingApiCall, setPendingApiCall] = useState(true)
    const [seeFullText, setSeeFullText] = useState(false)


    useEffect(() => {
        const fetchMovies = async () => {
            try {
                const response = await axios.get(`https://api.themoviedb.org/3/movie/${movieId}?language=en-US`, {
                    headers: {
                        accept: 'application/json',
                        Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJlYTdhNjU0M2Q5MjMxY2U5ODlkNWFiZDBkNDU0YzM3NSIsIm5iZiI6MTcyMTY0NjEyNS44ODQ2NzcsInN1YiI6IjY2OWJhM2YxNDNhMGQxZmI5YTk1NDM4NCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.QrJhGovqyEXAzOjWi3dcIhw4WPZDEGo9vcMtILvEpjU'
                    }
                });
                setMovie(response.data);

                const reviewResponse = await axios.get(`https://api.themoviedb.org/3/movie/${movieId}/reviews?language=en-US&page=1`, {
                    headers: {
                        accept: 'application/json',
                        Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJlYTdhNjU0M2Q5MjMxY2U5ODlkNWFiZDBkNDU0YzM3NSIsIm5iZiI6MTcyMTY0NjEyNS44ODQ2NzcsInN1YiI6IjY2OWJhM2YxNDNhMGQxZmI5YTk1NDM4NCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.QrJhGovqyEXAzOjWi3dcIhw4WPZDEGo9vcMtILvEpjU'
                    }
                });
                setReviews(reviewResponse.data.results);

                setPendingApiCall(false)
            } catch (error) {
                console.error("Error fetching genres:", error);
            }
        };

        fetchMovies();
    }, [location]);
    
    
    function sliceReview(str) {
        return str.length > 600 ? str.slice(0, 600) + ' ...' : str;
    }

    return (
        <>
            {pendingApiCall &&
                <div className='flex justify-center items-center'>
                    <Loading size="50" />
                </div>}
            <div className='  '>
                <div className='flex'>
                    <img src={"http://image.tmdb.org/t/p/w500/" + movie?.backdrop_path} alt={movie?.backdrop_path} className='rounded-lg h-96 w-1/2  ml-12 my-6 mr-8' />
                    <div className='mt-12 text-white'>
                        <h1 className="text-white font-bold text-3xl">{movie.original_title}</h1>
                        <h1 className="text-white">{movie.overview}</h1>

                        <div className='flex justify-between items-center p-12'>
                            <h1 className="text-white">Realese date : {movie.release_date}</h1>
                            <div className='flex items-center mr-12'>
                                <img src={starIcon} alt="" className='h-5 w-5' />

                                <p class="ms-2  font-bold text-white">{movie.vote_average}</p>
                                <span class="w-3 h-3 mx-1.5 bg-gray-500 rounded-full dark:bg-gray-400"></span>
                                <a href="#" class=" font-medium  underline text-white text-nowrap">{movie.vote_count}</a></div>
                        </div>
                    </div>
                </div>
                {reviews.map((review, index) => (
                    <div key={index}>
                        <div className='bg-gray-800 mx-6 rounded-lg'>


                            <div className='flex gap-3 items-center p-2 w-3/4 my-2'>
                                <img src={"http://image.tmdb.org/t/p/w500/" + review?.author_details.avatar_path} alt={review?.author_details.avatar_path} className='h-12 w-12 rounded-full' />
                                <p className='text-white'>{review.author}</p>
                                <hr />


                            </div>
                            {seeFullText ? <p className='text-white py-2 px-6'>{review.content}</p> : <p className='text-white py-2 px-6'>{sliceReview(review.content)}</p> }
                            
                        </div>
                    </div>
                ))}
            </div>
        </>
    )
}

export default MovieDetails