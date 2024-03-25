import { useEffect, useState } from "react";
import { AccountView } from "../account-view/account-view";
import { FavoritesView } from "../favorites-view/favorites-view";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";
import { LoginView } from "../login-view/login-view";
import { SignupView } from "../signup-view/signup-view";
import { NavigationBar } from "../navigation-bar/navigation-bar";
import { Row, Col } from "react-bootstrap";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { FavoritesView } from "../favorites-view/favorites-view";

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


  // POST Favorite Movie
  const addFavorite = (id) => {

    fetch(`https://tinflicks-2bf7ff98613b.herokuapp.com/users/${user.Username}/movies/${id}`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`
      }
    }).then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        alert("Failed to add to favorites.");
      }
    }).then((user) => {
      if (user) {
        localStorage.setItem('user', JSON.stringify(user));
        setUser(user);
      }
    }).catch(error => {
      console.error('Error: ', error);
    });
  };

  // DELETE Favorite Movie
const removeFavorite = (id) => {
  fetch(`https://tinflicks-2bf7ff98613b.herokuapp.com/users/${user.Username}/movies/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`
    }
  }).then((response) => {
    if (response.ok) {
      return response.json();
    } else {
      alert("Failed to delete.");
    }
  }).then((user) => {
    if (user) {
      localStorage.setItem('user', JSON.stringify(user));
      setUser(user);
    }
  }).catch(error => {
    console.error('Error: ', error);
  });
};

  return (
    <BrowserRouter>
      <NavigationBar
        user={user}
        onLoggedOut={() => {
          setUser(null);
          localStorage.removeItem('token');
          localStorage.removeItem('user');
        }}
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
                      <LoginView on onLoggedIn={(user, token) => {
                        setUser(user);
                        setToken(token);
                      }}
                      />
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
                      <SignupView />
                    </Col>
                  )}
                </>
              }
            />
            {/* After login, return MovieView .. if not return LoginView */}
            <Route
              path="/movies/:movieID"
              element={
                <>
                  {!user ? (
                    <Navigate to="/login" replace />
                  ) : movies.length === 0 ? (
                    <Col>Movie not available!</Col>
                  ) : (
                    <Col sm={3} md={5} lg={6} xl={6
                    
                    }>
                      <MovieView 
                      movies={movies}
                      addFavorite={addFavorite}
                      removeFavorite={removeFavorite}
                       />
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
                        <Col className="mb-5" key={movie._id} md={3}>
                          <MovieCard 
                          movie={movie}
                          removeFavorite={removeFavorite}
                          addFavorite={addFavorite}
                          isFavorite={user.FavoriteMovies.includes(movie._id)} />
                        </Col>
                      ))}
                    </>
                  )}
                </>
              }
            />
            {/* Return FavoritesView to user, otherwise send to LoginView */}
            <Route
              path="/favorites"
              element={
                <>
                  {!user ? (
                    <Navigate to="/login" replace />
                  ) : (
                    <Col>
                      <FavoritesView
                        user={user}
                        movies={movies}
                        removeFavorite={removeFavorite}
                        addFavorite={addFavorite}
                      />
                    </Col>
                  )}
                </>
              }
            />
            {/* Return AccountView to user, otherwise send to LoginView */}
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