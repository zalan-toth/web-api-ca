import React from "react";
import {useParams} from "react-router-dom";
import PageTemplate from "../components/templateMoviePage";
import {getMovie} from "../api/tmdb-api";
import CreditsPage from "../components/creditsPage";
import {useQuery} from "react-query";
import Spinner from "../components/spinner";

const MovieCreditsPage = (props) => {

    const { id } = useParams();
    const { data: movie, error, isLoading, isError } = useQuery(
        ["movie", { id }],
        getMovie
    );
    if (isLoading) {
        return <Spinner />;
    }

    if (isError) {
        return <h1>{error.message}</h1>;
    }

    return (
        <PageTemplate movie={movie}>
            <CreditsPage movieId={id}/>
        </PageTemplate>
    );
};

export default MovieCreditsPage;