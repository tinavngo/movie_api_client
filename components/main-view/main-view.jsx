// Component for MovieCard
import { useEffect, useState } from "react";
import { AccountView } from "../account-view/account-view";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";
import { LoginView } from "../login-view/login-view";
import { SignupView } from "../signup-view/signup-view";
import { NavigationBar } from "../navigation-bar/navigation-bar";
import { Row, Col, Button, NavItem } from "react-bootstrap";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

export const MainView = () => {
  const storedUser = JSON.parse(localStorage.getItem("user"));
  const storedToken = localStorage.getItem("token");
  const [movies, setMovies] = useState([]);
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
    <BrowserRouter>
    <NavigationBar
    user={user}
    onLoggedOut={() => setUser(null)}
    />
    <br />
    <Row>
      <Row className="justify-content-md-center">
        <Routes>
          {/* Send to mainpage .. if not logged in, return Login view */}
          <Route
          path="/login"
          element={
            <>
            {user ? (
              <Navigate to="/" />
            ) : (
              <Col md={5}>
                <LoginView on onLoggedIn={(user) => setUser(user)} />
              </Col>
            )}
            </>
          }
          />
          {/* Send to mainpage .. if not logged in, return Signup View */}
          <Route
          path="/signup"
          element={
            <>
            {user ? (
              <Navigate to="/" />
            ) : (
              <Col md={5}>
                <SignupView/>
              </Col>
            )}
            </>
          }
          />
          {/* After login, return MovieView .. if not return LoginView */}
          <Route
          path="/movies/:MovieID"
          element={
            <>
            {!user ? (
              <Navigate to="/login" replace />
            ) : movies.length === 0 ? (
              <Col>Movie not available!</Col>
            ) : (
              <Col md={8}>
                <MovieView movies={movies} />
              </Col>
            )}
            </>
          }
          />
          <Route
          path="/"
          element={
            <>
            {!user ? (
              <Navigate to="/login" replace />
            ) : movies.length === 0 ? (
              <Col>Movie not available!</Col>
            ) : (
              <>
              {movies.map((movie) => (
                <Col className="mb-4" key={movie._id} md={3}>
                  <MovieCard movie={movie} />
                </Col> 
              ))}
              </>
            )}
            </>
          }
          />
        </Routes>
            <Route
              path="/account"
              element={
                <>
                  {!user ? (
                    <Navigate to="/login" replace />
                  ) : (
                    <Col>
                      <AccountView
                        user={user}
                        movies={movies}
                        setUser={setUser}
                      />
                    </Col>
                  )}
                </>
              }
            />
          </Routes>
        </Row>
      </Row>
    </BrowserRouter>
  );
};