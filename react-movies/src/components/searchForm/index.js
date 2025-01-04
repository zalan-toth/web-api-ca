import React, { useState } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { useNavigate } from "react-router-dom";
import SearchIcon from "@mui/icons-material/Search";

const SearchForm = () => {
    const [title, setTitle] = useState("");
    const navigate = useNavigate();

    const handleSubmit = (event) => {
        event.preventDefault(); // Prevent page refresh
        if (title.trim()) {
            navigate(`/movies/search/${title}`); // Navigate to the search results page
        }
    };

    return (
        <form noValidate onSubmit={handleSubmit}>
            <Typography variant="h5" component="h1">
                <SearchIcon fontSize="large" />
                Search for movies.
            </Typography>
            <TextField
                id="filled-search"
                label="Title of the movie"
                type="search"
                variant="filled"
                value={title}
                onChange={(event) => setTitle(event.target.value)} // Update state on input change
                fullWidth
                margin="normal"
            />
            <Box mt={2}>
                <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                >
                    Search
                </Button>
            </Box>
        </form>
    );
};

export default SearchForm;
