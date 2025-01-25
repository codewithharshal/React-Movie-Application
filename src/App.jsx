import React, { useEffect, useState } from "react";
import Search from "./components/search";
import Spinner from "./components/Spinner";
import Moviescard from "./components/moviesCard";
import { useDebounce } from "react-use";

const API_BASE_URL = "https://www.omdbapi.com/";
const API_KEY = import.meta.env.VITE_OMDB_API_KEY;

const API_OPTIONS = {
  method: "GET",
  headers: {
    accept: "application/json",
  },
};

function App() {
  const [searchTerm, setsearchTerm] = useState("");
  const [errorMessage, seterrorMessage] = useState("");
  const [moviesList, setMoviesList] = useState([]);
  const [isLoading, setisLoading] = useState(false);
  const [currentPage, setCurrentpage] = useState(1);
  const [debouncesearchTerm, setdebouncesearchTerm] = useState("");

  useDebounce(() => setdebouncesearchTerm(searchTerm), 500, [searchTerm]);

  const FeatchMovies = async (query = "", page = 1) => {
    setisLoading(true);
    seterrorMessage("");
    try {
      const endpoint = `${API_BASE_URL}?s=${query.replace(
        / /g,
        "+"
      )}&page=${page}&apikey=${API_KEY}`;

      const responce = await fetch(endpoint, API_OPTIONS);

      if (!responce.ok) {
        throw new Error("Failed to fetch movies");
      }

      const data = await responce.json();

      if (data.Response === "False") {
        seterrorMessage(data.Error || "Falid to Load");
        setMoviesList([]);
        return;
      }

      setMoviesList(data.Search || []);
    } catch (error) {
      console.log(`Error featching Movies: ${error}`);
      seterrorMessage("Error, Please try again later.");
    } finally {
      setisLoading(false);
    }
  };
  useEffect(() => {
    FeatchMovies(debouncesearchTerm, currentPage);
  }, [debouncesearchTerm, currentPage]);

  const handleNextPage = () => {
    setCurrentpage((prevPage) => prevPage + 1);
  };

  return (
    <main>
      <div className="pattern">
        <div className="wrapper">
          <header>
            <img src="./hero.png" alt="Hero Banner" />
            <h1>
              Find <span className="text-gradient">Movies</span> You'll Enjoy
              Without the Hassle
            </h1>
            <Search searchTerm={searchTerm} setsearchTerm={setsearchTerm} />
          </header>

          <section className="all-movies">
            <h2 className="text-[50px]">All Movies</h2>

            {isLoading ? (
              <Spinner />
            ) : errorMessage ? (
              <p className="text-red-500">{errorMessage}</p>
            ) : (
              <ul>
                {moviesList.map((movie, index) => (
                  <Moviescard key={index} movie={movie} />
                ))}
              </ul>
            )}

            <div>
              <button
                className="text-white text-center"
                onClick={handleNextPage}
              >
                Next Page
              </button>
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}

export default App;
