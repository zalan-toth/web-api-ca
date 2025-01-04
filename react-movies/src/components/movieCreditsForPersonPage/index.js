import React from "react";
import { useQuery } from "react-query";
import Spinner from '../spinner'
import {getMovieCreditsForPerson, getPerson} from "../../api/tmdb-api";
import {useParams} from "react-router-dom";
import PageTemplate from "../templateMovieListPage";
import AddToFavoritesIcon from "../cardIcons/addToFavorites";
import AddToWatchIcon from "../cardIcons/addToWatch";

export default function PersonMovieCreditsPage({ personId, props }) {
    const {data, error, isLoading, isError} = useQuery(
        ["personMovieCredits", {id: personId}],
        getMovieCreditsForPerson
    );

    const { id } = useParams();
    const { data: person, error: personError, isLoading: personIsLoading, isError: personIsError } = useQuery(
        ["person", { id }],
        getPerson
    );

    if (isLoading || personIsLoading) {
        return <Spinner/>;
    }

    if (isError) {
        return <h1>{error.message}</h1>;
    }

    if (personIsError) {
        return <h1>{personError.message}</h1>;
    }

    const credits = data.cast;

    return (
        <PageTemplate
            title={`Movies with ${person.name}`}
            movies={credits}
            pagination={false}
            action={(movie) => {
                return (
                    <>
                        <AddToFavoritesIcon movie={movie} />
                        <AddToWatchIcon movie={movie} />
                    </>
                );
            }}
        />

    );
}