import React, {useState} from "react";
import Header from "../headerMovieList";
import Grid from "@mui/material/Grid2";
import PeopleList from "../peopleList";
import Paper from "@mui/material/Paper";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import TableContainer from '@mui/material/TableContainer';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import Button from "@mui/material/Button";
import UnfoldMoreIcon from '@mui/icons-material/UnfoldMore';
import {ToggleButton, ToggleButtonGroup} from "@mui/material";
import ViewListIcon from '@mui/icons-material/ViewList';
import ViewModuleIcon from '@mui/icons-material/ViewModule';
import Typography from "@mui/material/Typography";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import EmojiEmotionsOutlinedIcon from '@mui/icons-material/EmojiEmotionsOutlined';
import PeopleCards from "../peopleCards";
import {useNavigate} from "react-router-dom";
import IconButton from "@mui/material/IconButton";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
function PeopleListPageTemplate({ people, title, action, pagination, page, location }) {
    const currentPage = Number(page) || 1;
    const navigate = useNavigate();

    const queryParams = new URLSearchParams(window.location.search);
    const initialView = queryParams.get('view') || 'list';
    const [view, setView] = React.useState(initialView);
    const queryString = `?view=${view}`;
    const handleChange = (event, nextView) => {
        navigate(`${location}/page/${currentPage}?view=${nextView}`);
        setView(nextView);
    };
    //https://www.selbekk.io/blog/creating-sortable-tables-with-react
    //configuration - default state init
    const [sortConfig, setSortConfig] = useState({ key: null, direction: 'ascending' });

    const debugMode = 0;
    //sorting logic
    //[...people] copy of people data and doing the sort on the copy
    const sortedPeople = [...people].sort((a, b) => {
        if (!sortConfig.key) return 0; //no column selected for sorting, no change!

        if (debugMode){console.log("Value check for a=",a,"and b=",b)}
        //comparing the values a and b
        if (a[sortConfig.key] < b[sortConfig.key]) {  //if "a" is smaller
            if (debugMode){console.log("a is smaller",a[sortConfig.key],"than b",b[sortConfig.key])}
            return sortConfig.direction === 'ascending' ? -1 : 1; //returning 1 for descending and -1 for ascending
        }
        if (a[sortConfig.key] > b[sortConfig.key]) { //if "a" is bigger
            if (debugMode){console.log("a is bigger",a[sortConfig.key],"than b",b[sortConfig.key])}
            return sortConfig.direction === 'ascending' ? 1 : -1; //returning 1 for ascending and -1 for desc
        }
        return 0; //fallback exit
    });

    console.log("pagination is set to",pagination)
    const handlePageChange = (direction) => {

        if (direction === "prev" && currentPage > 1) {
            navigate(`${location}/page/${currentPage - 1}${queryString}`);
        } else if (direction === "next") {
            navigate(`${location}/page/${currentPage + 1}${queryString}`);
        }
    };
    const handleSort = (key) => {
        if (debugMode) {
            console.log("==========================================================================================================================================");
            console.log("handleSort triggered with key:", key);
            console.log("Current sortConfig:", sortConfig);
        }
        setSortConfig((prev) => {
            const isSameKey = prev.key === key;
            const newDirection = isSameKey && prev.direction === 'ascending' ? 'descending' : 'ascending';
            const newSortConfig = { key, direction: newDirection };

            if (debugMode) {
                console.log("Previous key:", prev.key);
                console.log("Previous direction:", prev.direction);
                console.log("Is same key clicked again?:", isSameKey);
                console.log("New direction:", newDirection);
                console.log("New sortConfig to be set:", newSortConfig);
            }

            return newSortConfig;
        });
    }
    if (view==="list"){
        return (
            <Grid container>
                <Grid size={12}>
                    <Header title={title} />
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

                <ToggleButtonGroup
                    orientation="horizontal"
                    value={view}
                    exclusive
                    onChange={handleChange}
                >
                    <ToggleButton value="list" aria-label="list">
                        <ViewListIcon />
                    </ToggleButton>
                    <ToggleButton value="table" aria-label="module">
                        <ViewModuleIcon />
                    </ToggleButton>
                </ToggleButtonGroup>
                <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 650 }} aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell>
                                    <Button
                                        color="primary"
                                        onClick={() => handleSort("name")}
                                        size="large"
                                    >
                                        Name
                                        {sortConfig.key === "name" && (
                                            <UnfoldMoreIcon
                                                color={sortConfig.direction === "asc" ? "inherit" : "primary"}
                                                fontSize="medium"
                                            />
                                        )}
                                    </Button>
                                </TableCell>
                                <TableCell align="right">
                                    <Button color="secondary" size="large">Department</Button>
                                </TableCell>
                                <TableCell align="right">
                                    <Button
                                        color="primary"
                                        onClick={() => handleSort("popularity")}
                                        size="large"
                                    >
                                        Popularity
                                        {sortConfig.key === "popularity" && (
                                            <UnfoldMoreIcon
                                                color={sortConfig.direction === "asc" ? "inherit" : "primary"}
                                                fontSize="medium"
                                            />
                                        )}
                                    </Button>
                                </TableCell>
                                <TableCell align="right">
                                    <Button color="secondary" size="large">Gender</Button>
                                </TableCell>
                                <TableCell align="right">
                                    <Button color="secondary" size="large">Adult/Minor</Button>
                                </TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            <PeopleList action={action} people={sortedPeople}></PeopleList>

                        </TableBody>
                    </Table>
                </TableContainer>
            </Grid>
        );
    } else if (view==="table") {
        return (
            <Grid container>
                <Grid size={12}>
                    <Header title={title} />
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

                    <ToggleButtonGroup
                        orientation="horizontal"
                        value={view}
                        exclusive
                        onChange={handleChange}
                    >
                        <ToggleButton value="list" aria-label="list">
                            <ViewListIcon />
                        </ToggleButton>
                        <ToggleButton value="table" aria-label="module">
                            <ViewModuleIcon />
                        </ToggleButton>
                    </ToggleButtonGroup>

                    <Button
                        color="primary"
                        onClick={() => handleSort("name")}
                        size="large"
                    >
                        Name
                        {sortConfig.key === "name" && (
                            <UnfoldMoreIcon
                                color={sortConfig.direction === "asc" ? "inherit" : "primary"}
                                fontSize="medium"
                            />
                        )}
                    </Button>

                    <Button
                        color="primary"
                        onClick={() => handleSort("popularity")}
                        size="large"
                    >
                        Popularity
                        {sortConfig.key === "popularity" && (
                            <UnfoldMoreIcon
                                color={sortConfig.direction === "asc" ? "inherit" : "primary"}
                                fontSize="medium"
                            />
                        )}
                    </Button>
                </Grid>

                <Grid container spacing={3}>

                    <PeopleCards action={action} people={sortedPeople}></PeopleCards>

                </Grid>
            </Grid>
        );
    } else {
        return (
            <Grid container>
                <Grid size={12}>
                    <Header title={title} />

                    <ToggleButtonGroup
                        orientation="horizontal"
                        value={view}
                        exclusive
                        onChange={handleChange}
                    >
                        <ToggleButton value="list" aria-label="list">
                            <ViewListIcon />
                        </ToggleButton>
                        <ToggleButton value="table" aria-label="module">
                            <ViewModuleIcon />
                        </ToggleButton>
                    </ToggleButtonGroup>
                    <ArrowBackIcon></ArrowBackIcon>

                </Grid>
                <Typography fontSize="large">This is a secret page! </Typography><EmojiEmotionsOutlinedIcon />
            </Grid>
        )
    }
}
export default PeopleListPageTemplate;