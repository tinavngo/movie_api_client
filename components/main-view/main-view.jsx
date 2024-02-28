// Component for MovieCard
import { useEffect, useState } from "react";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";

export const MainView = () => {
    const [movies, setMovies] = useState([
        {
          id: 1,
          title: "Curse of the Blair Witch",
          image:
            "https://m.media-amazon.com/images/I/71NdPnAPvWL._AC_UY218_.jpg",
          description:  "The uncensored investigation into disappearances of the three film-makers in 1994.",
          genre: "Horror",
          director: "Marijn Haverbeke",
          featured: true
        },
        {
          id: 2,
          title: "Perfect Blue",
          image:
            "https://m.media-amazon.com/images/I/81iE8bYtHUL._AC_UY218_.jpg",
          description:  "A young Japanese singer is encouraged by her agent to quit singing and pursue an acting career, beginning with a role in a murder mystery TV show.",
          genre: "Mystery",
          director: "Satoshi Kon",
          featured: false
        },
        {
          id: 3,
          title: "Blade Runner 2049",
          image:
            "https://m.media-amazon.com/images/I/91XUYVDsPAL._AC_UY218_.jpg",
          description:  "Officer K (Ryan Gosling), a new blade runner for the Los Angeles Police Department, unearths a long-buried secret that has the potential to plunge what's left of society into chaos.",
          genre: "Thriller",
          director: "Denis Villeneuve",
          featured: false
        },
        {
          id: 4,
          title: "Fear and Loathing in Las Vegas",
          image:
            "https://m.media-amazon.com/images/I/810zs8ZBFwL._AC_UY218_.jpg",
          description:  "Raoul Duke (Johnny Depp) and his attorney Dr. Gonzo (Benicio del Toro) drive a red convertible across the Mojave desert to Las Vegas with a suitcase full of drugs to cover a motorcycle race.",
          genre: "Comedy",
          director: "Terry Gilliam",
          featured: false
        },
        {
          id: 5,
          title: "Once Upon a Time... in Hollywood",
          image:
            "https://m.media-amazon.com/images/I/91IDTwTxsfL._AC_UY218_.jpg",
          description:  "Actor Rick Dalton gained fame and fortune by starring in a 1950s television Western, but is now struggling to find meaningful work in a Hollywood that he doesn't recognize anymore.",
          genre: "Crime",
          director: "Quentin Tarantino",
          featured: true

            _id: movie._id,
            Title: movie.Title,
            Description: movie.Description,
            MPAARating: movie.MPAARating,
            ReleaseYear: movie.ReleaseYear,

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
    }, []);
   
      // identify whether there was a user click or not
      const [selectedMovie, setSelectedMovie] = useState(null);
      
      if(selectedMovie) {
        return  (
          <MovieView
          movie={selectedMovie}
          onBackClick={() => {
            setSelectedMovie(null);
          }}
          />
        );
      }

      if (movies.length  === 0) {
        return <div>The list is empty!</div>;
      }
      return  (
        <div> 
            {movies.map((movie)=> (
                <MovieCard 
                key={movie.id}
                movie={movie}
                onMovieClick ={(newSelectedMovie) => {
                    setSelectedMovie(newSelectedMovie);
                }}
                />
            ))}
            </div>
      );
};