import { MovieCard } from "../movie-card/movie-card";
import { Row, Col, Button } from "react-bootstrap";
import { Link } from "react-router-dom";

export const FavoritesView = ({ removeFavorite, addFavorite, isFavorite, movies, user }) => {
    const favMovieList = movies.filter(m => user.FavoriteMovies.includes(m._id));
    
    return (
        <>
        <h2>My Favorite Movies</h2>
        <hr/>
        <Row className="justify-content-right justify-content-md-center">
            {
                favMovieList?.length !== 0 ?
                favMovieList?.map((movie) => (
                    <Col sm={7} md={5} lg={3} xl={3} className="mx-5 mt-5 mb-5 col-6 similar-movies-img" key={movie._id}>
                        <MovieCard
                        movie={movie}
                        removeFavorite={removeFavorite}
                        addFavorite={addFavorite}
                        isFavorite={user.FavoriteMovies.includes(movie._id)}
                        />
                    </Col>
                ))
                : <Col>
                <h6>No favorite movies.</h6>
                <Link to={`/`}>
                        <Button variant="primary">Find more movies</Button>
                    </Link>
                </Col>
            }
        </Row>
        </>
    )
}