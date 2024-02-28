import PropTypes from "prop-types";

// Component prop here
export const  MovieView = ({ movie, onBackClick }) =>  {
    return  (
    <div>
        <div>
            <img src={movie.image} alt={movie.title}/>
        </div>
        <div>
            <span>Title: </span>
            <span>{movie.title}</span>
        </div>
        <div>
        <span>Director: </span>
        <span>{movie.director}</span>
    </div>
    <div>
        <span>Description: </span>
        <span>{movie.description}</span>
    </div>
    <div>
        <span>Genre: </span>
        <span>{movie.genre}</span>
    </div>
    <div>
        <span>Featured: </span>
        <span>{movie.featured}</span>
    </div>
    <button onClick={onBackClick}> Back </button>
 </div> 
    );
};

//MovieView PropTypes
MovieView.propTypes = {

    movie: PropTypes.shape({
        title: PropTypes.string.isRequired,
        description: PropTypes.string.isRequired,
        genre: PropTypes.string.isRequired,
        featured: PropTypes.string.isRequired,
        director: PropTypes.string, 
      }).isRequired,
      onBackClick: PropTypes.func.isRequired,
      };