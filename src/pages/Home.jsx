import React from 'react'
import CategorizeMovies from "../components/CategorizeMovies";
import MovieCarousel from "../components/MovieCarousel";
function Home() {
  return (
    <div >
    <MovieCarousel />
    <div>
      <CategorizeMovies title={"popular"} />
      <CategorizeMovies title={"top_rated"} />
      <CategorizeMovies title={"upcoming"} />
    </div>
  </div>
  )
}

export default Home