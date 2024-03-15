// Component for MovieCard
import { useEffect, useState } from "react";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";
import { LoginView } from "../login-view/login-view";
import { SignupView } from "../signup-view/signup-view";
import { Row, Col, Button } from "react-bootstrap";

export const MainView = () => {
  const storedUser = JSON.parse(localStorage.getItem("user"));
  const storedToken = localStorage.getItem("token");
  const [movies, setMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [user, setUser] = useState(storedUser ? storedUser : null);
  const [token, setToken] = useState(storedToken ? storedToken : null);

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


  return (
    <Row>
      <Row className="justify-content-md-center">
        {!user ? (
          <Col md={4}>
            <LoginView
              onLoggedIn={(user, token) => {
                setUser(user);
                setToken(token);
              }}
            />
            <br />
            <hr />
            <SignupView />
          </Col>
        ) : selectedMovie ? (
          <Col md={8}>
            <MovieView
              key={movies._id}
              movie={selectedMovie}
              onBackClick={() => setSelectedMovie(null)}
            />
          </Col>
        ) : movies.length === 0 ? (
          <div>The list is empty!</div>
        ) : (
          <>
            {movies.map((movie) => (
              <Col className="mb-5" key={movie._id} md={3}>
                <MovieCard
                  movie={movie}
                  onMovieClick={(newSelectedMovie) => {
                    setSelectedMovie(newSelectedMovie);
                  }}
                />
              </Col>
            ))}
            <Button
              onClick={() => {
                setUser(null);
                setToken(null);
                localStorage.clear();
              }}
            >
              Logout
            </Button>
          </>
        )}
      </Row>
    </Row>
  );
};