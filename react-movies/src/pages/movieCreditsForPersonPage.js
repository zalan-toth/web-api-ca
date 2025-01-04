import React from "react";
import {useParams} from "react-router-dom";
import PageTemplate from "../components/templatePersonPage";
import {getPerson} from "../api/tmdb-api";
import {useQuery} from "react-query";
import Spinner from "../components/spinner";
import PersonMovieCreditsPage from "../components/movieCreditsForPersonPage";

const MovieCreditsForPersonPage = (props) => {

    const { id } = useParams();
    const { data: person, error, isLoading, isError } = useQuery(
        ["person", { id }],
        getPerson
    );
    if (isLoading) {
        return <Spinner />;
    }

    if (isError) {
        return <h1>{error.message}</h1>;
    }

    return (
        <PageTemplate person={person}>
            <PersonMovieCreditsPage personId={id}/>
        </PageTemplate>
    );
};

export default MovieCreditsForPersonPage;