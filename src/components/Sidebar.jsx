import axios from 'axios';
import React, { useEffect, useState } from 'react'

function Sidebar() {
    const [genres, setGenres] = useState([]);
    const [showGenres, setShowGenres] = useState([]);
    useEffect(() => {
        const fetchMovies = async () => {
            try {
                const response = await axios.get("https://streaming-availability.p.rapidapi.com/genres", {
                    params: {
                        output_language: 'en'
                    },
                    headers: {
                        'x-rapidapi-key': '178a257899mshdbb6553358cc760p15e847jsn5eeebd79508b',
                        'x-rapidapi-host': 'streaming-availability.p.rapidapi.com'
                    }
                });
                setGenres(response.data);
                setShowGenres(genres.slice(0, 10))

            } catch (error) {
                console.error("Error fetching movies:", error);
            }
        };

        fetchMovies();
    }, []);
    return (
        <div className='bg-gray-800 p-6 h-screen w-1/6 rounded-lg'>
            <div className='flex justify-between items-center'>
                <h1 className=' text-slate-300 text-lg'>Genre</h1>
                <a href='#' className='px-3 py-1 bg-slate-600 rounded-xl text-white' >See All</a>
            </div>
            <div className='grid grid-cols-2 pt-6  '>
                {showGenres.map((genre, index) => (
                <div className='pt-3'>
                    <a href='#' className='px-2 py-1  bg-slate-600 rounded-xl text-white' >{genre.name}</a>

                    </div>
                ))}
            </div>
        </div>
    )
}

export default Sidebar