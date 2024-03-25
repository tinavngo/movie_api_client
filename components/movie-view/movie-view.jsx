import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import "./movie-view.scss";
import { MovieCard } from "../movie-card/movie-card";

// Component prop here
export const MovieView = ({ movies, removeFavorite, addFavorite, isFavorite }) => {

    const { movieID } = useParams();
    const movie = movies.find((movie) => movie._id === movieID);

// Similar Movies
const selectedMovie = movies.find((movie) => movie._id === movieID);
const similarMovies = movies.filter((movie) => {
    return movie._id !== movieID && movie.Genre.Name === selectedMovie.Genre.Name;
});

// Defining User
const user = JSON.parse(localStorage.getItem('user'));

    return (
        <>
            <Row className="justify-content-md-center">
                <Col md={7} className="col-12">
                    <img src={movie.ImagePath} alt={movie.Title} className="mx-auto w-100"/>
                </Col>
                <Col md={5} className="col-12">
                    <Row className="my-1">
                        <span className="h1">{movie.Title}</span>
                    </Row>
                    <Row className="my-1">
                        <span className="h6">Description: </span>
                        <span>{movie.Description}</span>
                    </Row>
                    <hr/>
                    <Row className="my-1">
                        <span className="h6">Director: </span>
                        <span>{movie.Director.Name}</span>
                    </Row>
                    <Row className="my-1">
                        <span className="h6">Genre: </span>
                        <span>{movie.Genre.Name}</span>
                    </Row>
                    <Row className="my-1">
                        <span className="h6">Release Year: </span>
                        <span>{movie.ReleaseYear}</span>
                    </Row>
                    <br/>
                    <Link to={`/`}>
                        <Button className="text-center" > Back </Button>
                    </Link>
                </Col>
            </Row>
            <hr/>
            <h3>Similar Movies</h3>
            <Row className="justify-content-center">
                {
                    similarMovies.length !== 0 ?
                    similarMovies.slice(0,5).map((movie) => (
                        <Col  sm={5} md={4} lg={3} xl={3} className="mx-2 my-3 col-6 similar-movies-img" key={movie._id}>
                            <MovieCard
                            movie={movie}
                            removeFavorite={removeFavorite}
                            addFavorite={addFavorite}
                            isFavorite={user.FavoriteMovies.includes(movie._id)}
                            />
                            </Col>
                    ))
                    : <Col>
                    <p>No Similar Movies</p>
                    </Col>
                }
            </Row>
        </>
    );
};

