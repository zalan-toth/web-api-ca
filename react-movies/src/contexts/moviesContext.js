import React, { useState } from "react";

export const MoviesContext = React.createContext(null);

const MoviesContextProvider = (props) => {
    const [toWatch, setToWatch] = useState( [] )
    const [favorites, setFavorites] = useState( [] )
    const [myReviews, setMyReviews] = useState( {} )

    const addToFavorites = (movie) => {
        let newFavorites = [];
        if (!favorites.includes(movie.id)){
            newFavorites = [...favorites, movie.id];
        }
        else{
            newFavorites = [...favorites];
        }
        setFavorites(newFavorites)
    };

    const getToWatchList = () => {
        return toWatch;
    }
    const getFavorites = () => {
        return favorites;
    }
    console.log(toWatch)
    const addToWatch = (movie) => {
        let newToWatch = [];
        if (!toWatch.includes(movie.id)){
            newToWatch = [...toWatch, movie.id];
        }
        else{
            newToWatch = [...toWatch];
        }
        setToWatch(newToWatch)
    };

    // We will use this function in the next step
    const removeFromFavorites = (movie) => {
        setFavorites( favorites.filter(
            (mId) => mId !== movie.id
        ) )
    };
    const removeFromToWatch = (movie) => {
        setToWatch( toWatch.filter(
            (mId) => mId !== movie.id
        ) )
    };
    const addReview = (movie, review) => {
        setMyReviews( {...myReviews, [movie.id]: review } )
    };
    //console.log(myReviews);

    return (
        <MoviesContext.Provider
            value={{
                favorites,
                toWatch,
                addToFavorites,
                addToWatch,
                removeFromFavorites,
                removeFromToWatch,
                addReview,
                getToWatchList,
                getFavorites
            }}
        >
            {props.children}
        </MoviesContext.Provider>
    );
};

export default MoviesContextProvider;