import PropTypes from "prop-types";
import React from "react";
import { Card } from "react-bootstrap";
import "./movie-card.scss";

//Component prop here
export const MovieCard = ({ movie, onMovieClick }) => {
    return (
        <Card onClick={() => onMovieClick(movie)} variant="link" className="h-100">
            <Card.Img variant="top" src={movie.ImagePath} />
            <Card.Body>
                <Card.Title>{movie.Title}</Card.Title>
                <Card.Text>{movie.Director.Name}</Card.Text>
            </Card.Body>
        </Card>
    );
};

//Here is where all of the props contraints for the MovieCard are defined
MovieCard.propTypes = {
    movie: PropTypes.shape({
        Title: PropTypes.string.isRequired,

    }).isRequired,
    onMovieClick: PropTypes.func.isRequired,
};