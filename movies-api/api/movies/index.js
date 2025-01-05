import movieModel from './movieModel';
import asyncHandler from 'express-async-handler';
import express from 'express';
import {
    getMovieGenres,
    getUpcomingMovies,
    getTrendingMovies,
    getPlayingMovies,
    getPeople,
    getMovie,
    getPerson
  } from '../tmdb-api';
  

const router = express.Router();

router.get('/', asyncHandler(async (req, res) => {
    let { page = 1, limit = 10 } = req.query; // destructure page and limit and set default values
    [page, limit] = [+page, +limit]; //trick to convert to numeric (req.query will contain string values)

    // Parallel execution of counting movies and getting movies using movieModel
    const [total_results, results] = await Promise.all([
        movieModel.estimatedDocumentCount(),
        movieModel.find().limit(limit).skip((page - 1) * limit)
    ]);
    const total_pages = Math.ceil(total_results / limit); //Calculate total number of pages (= total No Docs/Number of docs per page) 

    //construct return Object and insert into response object
    const returnObject = {
        page,
        total_pages,
        total_results,
        results
    };
    res.status(200).json(returnObject);
}));


// Get movie details
router.get('/:id', asyncHandler(async (req, res) => {
    const id = parseInt(req.params.id);
    const movie = await movieModel.findByMovieDBId(id);
    if (movie) {
        res.status(200).json(movie);
    } else {
        res.status(404).json({message: 'The movie you requested could not be found.', status_code: 404});
    }
}));

router.get('/tmdb/upcoming', asyncHandler(async (req, res) => {
    let { page = 1, limit = 50 } = req.query; // destructure page and limit and set default values
    [page, limit] = [+page, +limit]; //trick to convert to numeric (req.query will contain string values)

        const upcomingMovies = await getUpcomingMovies(page);

        const responseObject = {
            page: upcomingMovies.page,
            total_pages: upcomingMovies.total_pages,
            total_results: upcomingMovies.total_results,
            results: upcomingMovies.results,
        };

    res.status(200).json(responseObject);
}));

router.get('/tmdb/playing', asyncHandler(async (req, res) => {
    let { page = 1, limit = 50 } = req.query; // destructure page and limit and set default values
    [page, limit] = [+page, +limit]; //trick to convert to numeric (req.query will contain string values)

        const playingMovies = await getPlayingMovies(page);

        const responseObject = {
            page: playingMovies.page,
            total_pages: playingMovies.total_pages,
            total_results: playingMovies.total_results,
            results: playingMovies.results,
        };

    res.status(200).json(responseObject);
}));

router.get('/tmdb/trending', asyncHandler(async (req, res) => {
    let { page = 1, limit = 50 } = req.query; // destructure page and limit and set default values
    [page, limit] = [+page, +limit]; //trick to convert to numeric (req.query will contain string values)

        const trendingMovies = await getTrendingMovies(page);

        const responseObject = {
            page: trendingMovies.page,
            total_pages: trendingMovies.total_pages,
            total_results: trendingMovies.total_results,
            results: trendingMovies.results,
        };

    res.status(200).json(responseObject);
}));

router.get('/tmdb/people', asyncHandler(async (req, res) => {
    let { page = 1, limit = 50 } = req.query; // destructure page and limit and set default values
    [page, limit] = [+page, +limit]; //trick to convert to numeric (req.query will contain string values)

        const people = await getPeople(page);

        const responseObject = {
            page: people.page,
            total_pages: people.total_pages,
            total_results: people.total_results,
            results: people.results,
        };

    res.status(200).json(responseObject);
}));

router.get('/tmdb/movie/:id', asyncHandler(async (req, res) => {
    const id = parseInt(req.params.id);

        const movie = await getMovie(id);


    res.status(200).json(movie);
}));

router.get('/tmdb/person/:id', asyncHandler(async (req, res) => {
    const id = parseInt(req.params.id);

        const person = await getPerson(id);


    res.status(200).json(person);
}));
export default router;

// I'll leave limit in, but it is not used as data is fetced from TMDB, it'll never exceed 50 as it relies on tmdb