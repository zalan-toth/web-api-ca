import React from "react";
import MovieDetails from "../components/movieDetails/";
import PageTemplate from "../components/templateMoviePage";
import { getLatestMovie } from '../api/tmdb-api'
import { useQuery } from "react-query";
import Spinner from '../components/spinner'
// import useMovie from "../hooks/useMovie";   Redundant

const LatestMoviePage = () => {
    //console.log(id)

    /*const movieQuery = (id === "latest") ? useQuery("latestMovie", getLatestMovie) :
        useQuery(["movie", { id: id }], getMovie);

    const { data: movie, error, isLoading, isError } = movieQuery;*/

    /*const { data: movie, error, isLoading, isError } = useQuery(
        ["movie", id],
        id === "latest" ? getLatestMovie : getMovie
    );*/

    const { data: movie, error, isLoading, isError } = useQuery(
        ["movie"],
        getLatestMovie
    );
    
    if (isLoading) {
        return <Spinner />;
    }

    if (isError) {
        return <h1>{error.message}</h1>;
    }



    return (
        <>
            {movie ? (
                <>
                    <PageTemplate movie={movie}>
                        <MovieDetails movie={movie} />
                    </PageTemplate>
                </>
            ) : (
                <p>Waiting for movie details</p>
            )}
        </>
    );
};

export default LatestMoviePage;