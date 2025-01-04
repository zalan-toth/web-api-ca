import React, { useContext } from "react";
import PageTemplate from "../components/templateMovieListPage";
import { MoviesContext } from "../contexts/moviesContext";
import { useQueries } from "react-query";
import { getMovie } from "../api/tmdb-api";
import Spinner from '../components/spinner'
import WriteReview from "../components/cardIcons/writeReview";
import AddToFavorites from "../components/cardIcons/addToFavorites";
import RemoveFromToWatch from "../components/cardIcons/removeFromToWatch";

const WatchListMoviesPage = () => {
    const {toWatch: movieIds } = useContext(MoviesContext);

    // Create an array of queries and run in parallel.
    const toWatchMovieQueries = useQueries(
        movieIds.map((movieId) => {
            return {
                queryKey: ["movie", { id: movieId }],
                queryFn: getMovie,
            };
        })
    );
    // Check if any of the parallel queries is still loading.
    const isLoading = toWatchMovieQueries.find((m) => m.isLoading === true);

    if (isLoading) {
        return <Spinner />;
    }

    const movies = toWatchMovieQueries.map((q) => {
        q.data.genre_ids = q.data.genres.map(g => g.id)
        return q.data
    });

    //const toDo = () => true;

    return (
        <PageTemplate
            title="Movies To Watch!"
            movies={movies}
            action={(movie) => {
                return (
                    <>
                        <AddToFavorites movie={movie} />
                        <RemoveFromToWatch movie={movie} />
                        <WriteReview movie={movie} />
                    </>
                );
            }}
        />
    );
};

export default WatchListMoviesPage;