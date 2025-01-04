import React, { useContext } from "react";
import { MoviesContext } from "../../contexts/moviesContext";
import IconButton from "@mui/material/IconButton";
import FavoriteIcon from "@mui/icons-material/Favorite";

const AddToFavoritesIcon = ({ movie }) => {
    const context = useContext(MoviesContext);

    const handleRemoveFromFavorites = (e) => {
        e.preventDefault();
        context.removeFromFavorites(movie);
    };
    const handleAddToFavorites = (e) => {
        e.preventDefault();
        context.addToFavorites(movie);
    };
    if (!context.getFavorites().includes(movie.id)){
        return (
            <IconButton aria-label="add to favorites" onClick={handleAddToFavorites}>
                <FavoriteIcon color="primary" fontSize="large" />
            </IconButton>
        );
    }

    return (
        <IconButton aria-label="add to favorites" onClick={handleRemoveFromFavorites}>
            <FavoriteIcon color="secondary" fontSize="large" />
        </IconButton>
    );
};

export default AddToFavoritesIcon;