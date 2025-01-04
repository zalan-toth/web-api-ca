import React from "react";
import { useQuery } from "react-query";
import Spinner from '../spinner'
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import { getGenres } from "../../api/tmdb-api";
import SearchForm from "../searchForm";


export default function SearchCard() {

    const { data, error, isLoading, isError } = useQuery("genres", getGenres);

    if (isLoading) {
        return <Spinner />;
    }

    if (isError) {
        return <h1>{error.message}</h1>;
    }
    return (
        <Card
            sx={{
                backgroundColor: "rgb(255,212,178)"
            }}
            variant="outlined">
            <CardContent>
                <SearchForm></SearchForm>
            </CardContent>
        </Card>
    );
}