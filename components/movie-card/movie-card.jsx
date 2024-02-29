import PropTypes from "prop-types";

//Component prop here
export const MovieCard = ({movie, onMovieClick}) => {
    return (
    <div
    onClick={() =>{
        onMovieClick(movie);
    }}
    >
        {movie.Title}
    </div>
    )
};

//Here is where all of the props contraints for the MovieCard are defined
MovieCard.propTypes = {
    movie: PropTypes.shape ({
        Title: PropTypes.string.isRequired,

    }).isRequired,
    onMovieClick: PropTypes.func.isRequired,
};