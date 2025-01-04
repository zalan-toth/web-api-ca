import React from "react";
import {getPopularPeople} from "../api/tmdb-api";
import PageTemplate from '../components/templatePeopleListPage';
import { useQuery } from 'react-query';
import Spinner from '../components/spinner';
import {useParams} from "react-router-dom";

const PopularPeoplePage = (props) => {

    const { page } = useParams();
    let pageNumber = page
    if (pageNumber===undefined||(Number(pageNumber)<1)||Number(pageNumber)>500){
        pageNumber=1;
    }
    const {  data, error, isLoading, isError }  = useQuery(['popularPeople', { pageNumber }], getPopularPeople)

    if (isLoading) {
        return <Spinner />
    }

    if (isError) {
        return <h1>{error.message}</h1>
    }
    const popularPeople = data.results;

    // Redundant, but necessary to avoid app crashing.
    //const favorites = playingMovies.filter(m => m.favorite)
    //localStorage.setItem('favorites', JSON.stringify(favorites))
    //const addToFavorites = (movieId) => true

    return (
        <PageTemplate
            pagination={true}
            page={pageNumber}
            location={"/people/popular"}
            title="Popular People"
            people={popularPeople}
        />
    );
};
export default PopularPeoplePage;