import React from "react";
import {searchForMovies} from "../api/tmdb-api";
import PageTemplate from '../components/templateSearchPage';
import { useQuery } from 'react-query';
import Spinner from '../components/spinner';
import AddToFavoritesIcon from '../components/cardIcons/addToFavorites'
import AddToWatchIcon from "../components/cardIcons/addToWatch";
import {useParams} from "react-router-dom";

const SearchResultMoviesPage = ( props ) => {

    const { title, page } = useParams();


    let pageNumber = page
    if (pageNumber===undefined||(Number(pageNumber)<1)||Number(pageNumber)>500){
        pageNumber=1;
    }

    console.log("Page Title value",title)
    const { data, error, isLoading, isError } = useQuery(
        ["searchResult", { title }, { pageNumber }],
        searchForMovies
    );


    if (isLoading) {
        return <Spinner />
    }

    if (isError) {
        return <h1>{error.message}</h1>
    }
    const resultMovies = data.results;

    // Redundant, but necessary to avoid app crashing.
    //const favorites = resultMovies.filter(m => m.favorite)
    //localStorage.setItem('favorites', JSON.stringify(favorites))
    //const addToFavorites = (movieId) => true

    return (
        <PageTemplate
            title="Search Result"
            movies={resultMovies}
            pagination={true}
            page={pageNumber}
            location={`/movies/search/${title}`}
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
export default SearchResultMoviesPage;