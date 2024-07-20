import React from 'react';
import CategorizeMovies from "./components/CategorizeMovies";
import MovieCarousel from "./components/MovieCarousel";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";

function App() {
  return (
    <div className="min-h-screen bg-netflix-black">
      <Navbar />
      <div className="flex">
        <div className="flex-grow">
          <MovieCarousel />
          <div>
            <CategorizeMovies title={"popular"} />
            <CategorizeMovies title={"top_rated"} />
            <CategorizeMovies title={"upcoming"} />
          </div>
        </div>
        <Sidebar />
      </div>
    </div>
  );
}

export default App;
