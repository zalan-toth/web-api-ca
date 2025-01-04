import React, { useContext } from "react";
import { MoviesContext } from "../../contexts/moviesContext";
import IconButton from "@mui/material/IconButton";
import PlaylistAddIcon from "@mui/icons-material/PlaylistAdd";

const AddToWatchIcon = ({ movie }) => {
    const context = useContext(MoviesContext);

    const handleAddToWatch = (e) => {
        e.preventDefault();
        context.addToWatch(movie);
    };
    if (!context.getToWatchList().includes(movie.id)){
        return (
            <IconButton aria-label="add to watch list" onClick={handleAddToWatch}>
                <PlaylistAddIcon color="primary" fontSize="large" />
            </IconButton>
        );
    }

    return (
        <IconButton aria-label="add to watch list" onClick={handleAddToWatch} disabled>
            <PlaylistAddIcon fontSize="large" />
        </IconButton>
    );
};

export default AddToWatchIcon;