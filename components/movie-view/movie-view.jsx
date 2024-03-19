import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import "./movie-view.scss";

// Component prop here
export const MovieView = ({ movies }) => {

    const { movieID } = useParams();
    const movie = movies.find((movie) => movie._id === movieID);

    return (
        <>
            <Row className="my-5 justify-content-md-center">
                <Col className="my-image-col">
                    <img src={movie.ImagePath} alt={movie.Title} />
                </Col>
                <Col md={7} className="col-12">
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
                    <Row>
                        <span className="h6">Release Year: </span>
                        <span>{movie.ReleaseYear}</span>
                    </Row>
                    <br/>
                    <Link to={`/`}>
                        <Button variant="primary"> Back </Button>
                    </Link>
                </Col>
            </Row>
        </>
    );
};

