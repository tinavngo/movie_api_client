import Button from "react-bootstrap/Button";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import Row from "react-bootstrap/Row";
import PropTypes from "prop-types";

// Component prop here
export const MovieView = ({ movies }) => {

    const { MovieId } = useParams();
    const movie = movies.find((m) => m._id === MovieId);
    console.log(movie);

    return (
        <div>
            <div>
                <img src={movie.ImagePath} alt={movie.Title} />
            </div>
            <div>
                <span>Title: </span>
                <span>{movie.Title}</span>
            </div>
            <div>
                <span>Director: </span>
                <span>{movie.Director.Name}</span>
            </div>
            <div>
                <span>Description: </span>
                <span>{movie.Description}</span>
            </div>
            <div>
                <span>Genre: </span>
                <span>{movie.Genre.Name}</span>
            </div>
            <div>
                <span>MPAA Rating: </span>
                <span>{movie.MPAARating}</span>
            </div>
            <div>
                <span>Release Year: </span>
                <span>{movie.ReleaseYear}</span>
            </div>
            <Link to={`/`}>
            <Button> Back </Button>
            </Link>
        </div>
    );
};

//MovieView PropTypes
MovieView.propTypes = {

    movie: PropTypes.shape({
        Title: PropTypes.string.isRequired,
        Description: PropTypes.string.isRequired,

        Genre: PropTypes.shape({
            Name: PropTypes.string.isRequired,
        }).isRequired,

        Director: PropTypes.shape({
            Name: PropTypes.string.isRequired,
        }).isRequired,

        Featured: PropTypes.bool.isRequired,
        MPAARating: PropTypes.string.isRequired,
        ReleaseYear: PropTypes.number.isRequired,
        ImagePath: PropTypes.string.isRequired,
    }).isRequired
};