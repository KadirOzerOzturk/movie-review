import React from 'react';

import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import Home from './pages/Home';
import { Route, Routes } from 'react-router-dom';
import MovieDetails from './pages/MovieDetails';

function App() {
  return (
    <div className="min-h-screen bg-netflix-black">
      <Navbar />
      <div className="flex">
        <div className="flex-grow">
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path={`/:id`} element={<MovieDetails />} />
          </Routes>

        </div>
        <Sidebar />
      </div>
    </div>
  );
}

export default App;
