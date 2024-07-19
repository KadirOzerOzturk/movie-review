import MovieCarousel from "./components/MovieCarousel";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";

function App() {
  return (
    <div className=" min-h-screen  bg-netflix-black">
     <Navbar/>
     <div className="flex ">
     <MovieCarousel/>
      <Sidebar/>
     </div>
    </div>
  );
}

export default App;
