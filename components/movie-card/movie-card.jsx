import PropTypes from "prop-types";
import React from "react";
import "./movie-card.scss";
import { Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import { HeartFill, Heart } from "react-bootstrap-icons";

//Component prop here
export const MovieCard = ({ movie, isFavorite, addFavorite, removeFavorite }) => {
    return (
        <Card variant="link" className="movie-card h-100">
            <Link to={`/movies/${encodeURIComponent(movie._id)}`}>
            <Card.Img variant="top" src={movie.ImagePath} />
            </Link>
            <Card.Body>
                <Card.Title>{movie.Title}</Card.Title>
                <Card.Text>{movie.Director.Name}</Card.Text>
                    {isFavorite ? (
                        <HeartFill 
                        size={30} 
                        color="white"
                        className="heart-button1 mt-2 me-2 top-0 end-0 border border-secondary p-1"
                        onClick={() =>
                        removeFavorite(movie._id)}/>
                    ) : (
                        <Heart 
                        size={30} 
                        color="orange"
                        className="heart-button mt-2 me-2 top-0 end-0 border border-secondary p-1"
                        onClick={() => 
                        addFavorite(movie._id)}/>
                    )}
            </Card.Body>
        </Card>
    );
};

//Here is where all of the props contraints for the MovieCard are defined
MovieCard.propTypes = {
    movie: PropTypes.shape({
        Title: PropTypes.string.isRequired

    }).isRequired
};