import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate, useParams } from 'react-router-dom';

function SearchResults() {
    const [results, setResults] = useState([])

    const navigate = useNavigate();
    const { queryString } = useParams();
    console.log("query string " + queryString)


    useEffect(() => {
        const fetchResults = async () => {
            try {
                const response = await axios.get(`https://api.themoviedb.org/3/search/movie?query=${queryString}&include_adult=false&language=en-US&page=1`, {
                    headers: {
                        accept: 'application/json',
                        Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJlYTdhNjU0M2Q5MjMxY2U5ODlkNWFiZDBkNDU0YzM3NSIsIm5iZiI6MTcyMTQ3NjMzNi41NTA2NzksInN1YiI6IjY2OWJhM2YxNDNhMGQxZmI5YTk1NDM4NCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.YNtaBeWYycRjv0_a9gWsL04CG4TnJxpIisdnRYQWor4'
                    }
                });
                setResults(response.data.results)

            } catch (error) {
                console.error("Error fetching genres:", error);
            }
        };

        fetchResults();

    }, [queryString]);
    return (
        <>
            {results.map((result, index) => (
                <div key={index}>
                    <div className='bg-gray-800 mx-12  rounded-lg'>

                        <div className='flex justify-between gap-3 items-center py-2 px-6  w-3/4 my-2  '>
                            <div className='flex  items-center '>
                                <img src={"http://image.tmdb.org/t/p/w500/" + result.backdrop_path} alt={result.backdrop_path} className='h-24 w-36 rounded-lg' />
                                <p className='text-slate-300 font-bold mx-4 text-xl'>{result.original_title}</p>
                            </div>
                            <div className=''>
                                <button onClick={()=>navigate(`/${result.id}`)} className='rounded-lg  bg-netflix-red text-slate-300 hover:bg-red-600 px-3 py-2'>Overview</button>
                            </div>
                            
                            

                        </div>
                        <hr  className='mx-6'/>
                        <p className='text-slate-300 py-2 px-6'>{result.overview}</p>

                    </div>
                </div>
            ))}

        </>
    )
}

export default SearchResults