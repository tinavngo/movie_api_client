// Component for MovieCard
import { useEffect, useState } from "react";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";
import { LoginView } from "../login-view/login-view";
import { SignupView } from "../signup-view/signup-view";

export const MainView = () => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    const storedToken = localStorage.getItem("token");
    const [movies, setMovies] = useState([]);
    const [selectedMovie, setSelectedMovie] = useState(null);
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(null);
      
    useEffect(() => {
      if (!token) {
        return;
      }

      fetch("https://tinflicks-2bf7ff98613b.herokuapp.com/movies", {
        headers: { Authorization: `Bearer ${token}` }
      })

      .then((response) => response.json())
      .then((data) => {
        const moviesFromApi = data.map((movie) => {
          return {

            _id: movie._id,
            Title: movie.Title,
            Description: movie.Description,
            MPAARating: movie.MPAARating,
            ReleaseYear: movie.ReleaseYear,
            ImagePath: movie.ImagePath,
            Featured: movie.Featured,

            Genre: {
              Name: movie.Genre.Name
            },

            Director: {
              Name: movie.Director.Name
            }

          };
        });
        setMovies(moviesFromApi);
      });
    }, [token]);


      if (!user) {
        return (
          <>
          <LoginView onLoggedIn={(user, token) => {
            setUser(user);
            setToken(token);
          }} />
          or
          <SignupView />
          </>
        );
      }

      if(selectedMovie) {
        return  (
          <MovieView
          movie={selectedMovie}
          onBackClick={() => {
            setSelectedMovie(null);
          }}
          />
        );
      }

      if (movies.length  === 0) {
        return <div>The list is empty!</div>;
      }
      return  (
        <div> 
            {movies.map((movie)=> (
                <MovieCard 
                key={movie._id}
                movie={{
                  ...movie,
                Featured: movie.Featured === "true", //Convert string "true" to boolean
              }}
                onMovieClick ={(newSelectedMovie) => {
                    setSelectedMovie(newSelectedMovie);
                }}
                />
            ))}
            </div>
      );
};