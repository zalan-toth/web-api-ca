import React from "react";
import { getUpcomingMovies } from "../api/tmdb-api";
import PageTemplate from '../components/templateMovieListPage';
import { useQuery } from 'react-query';
import Spinner from '../components/spinner';
import AddToFavoritesIcon from '../components/cardIcons/addToFavorites'
import AddToWatchIcon from "../components/cardIcons/addToWatch";
import {useParams} from "react-router-dom";

const UpcomingMoviesPage = (props) => {

    const { page } = useParams();
    let pageNumber = page
    if (pageNumber===undefined||(Number(pageNumber)<1)||Number(pageNumber)>500){
        pageNumber=1;
    }
    const {  data, error, isLoading, isError }  = useQuery(['upcoming', { pageNumber }], getUpcomingMovies)

    if (isLoading) {
        return <Spinner />
    }

    if (isError) {
        return <h1>{error.message}</h1>
    }
    const upcomingMovies = data.results;

    // Redundant, but necessary to avoid app crashing.
    const favorites = upcomingMovies.filter(m => m.favorite)
    localStorage.setItem('favorites', JSON.stringify(favorites))
    //const addToFavorites = (movieId) => true

    return (
        <PageTemplate
            title="Upcoming Movies"
            movies={upcomingMovies}
            pagination={true}
            page={pageNumber}
            location={"/movies/upcoming"}
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
};
export default UpcomingMoviesPage;