import React from "react";
import Header from "../headerMovieList";
import MovieList from "../movieList";
import Grid from "@mui/material/Grid2";
import SearchCard from "../searchCard";
import IconButton from "@mui/material/IconButton";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import {useNavigate} from "react-router-dom";

function TemplateSearchPage({ movies, action, pagination, page, location }) {
    const currentPage = Number(page) || 1;
    const navigate = useNavigate();

    if (movies===undefined){
        movies=[];
    }

    const handlePageChange = (direction) => {
        if (direction === "prev" && currentPage > 1) {
            navigate(`${location}/page/${currentPage - 1}`);
        } else if (direction === "next") {
            navigate(`${location}/page/${currentPage + 1}`);
        }
    };

    return (
        <Grid container>
            <Grid size={12}>
                <Header title="Search" />

                {pagination && (
                    <Grid
                        container
                        sx={{
                            justifyContent: "center",
                            alignItems: "center",
                            marginTop: "20px",
                        }}
                    >
                        <IconButton
                            onClick={() => handlePageChange("prev")}
                            disabled={currentPage === 1}
                        >
                            <ArrowBackIcon />
                        </IconButton>
                        <span style={{ fontSize: "165%", margin: "0 20px" }}>Page {currentPage}</span>
                        <IconButton
                            onClick={() => handlePageChange("next")}
                            disabled={currentPage === 500}
                        >
                            <ArrowForwardIcon />
                        </IconButton>
                    </Grid>
                )}
            </Grid>
            <Grid container sx={{flex: "1 1 500px"}}>
                <Grid
                    key="find"
                    size={{xs: 12, sm: 6, md: 4, lg: 3, xl: 2}}
                    sx={{padding: "20px"}}
                >
                    <SearchCard/>
                </Grid>
                <MovieList action={action} movies={movies}></MovieList>
            </Grid>
        </Grid>
    );
}
export default TemplateSearchPage;
//<MovieList action={action} movies={displayedMovies}></MovieList>