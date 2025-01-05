# Web API / React App Integration
#### Assignment for Web App Development at SETU

This repository consists of base elements.
**React App base:** https://github.com/zalan-toth/React-Movie-Application/
**Node App base:** https://github.com/zalan-toth/node-api-labs

# Assignment 2 - Web API / React App Integration.

Name: *Zalán Tóth* (20102768)

## Overview. :monocle_face:

This repository contains the code for a react web app and a node app (API). The react app relies on the node app to fetch data using API. This application was developed using Visual Studio Code.

Several endpoints were added to the API that are fetching the data from TMDB. Those API endpoints are used by the react app, so there are several API calls integrated on the frontend. There is a simple login and signup implemented in the application. Those show up on the right side of the site header. Most routes are protected, therefore a login (authentication) is required to access those. It will automatically prompt you to login if you try to access a portected route usually marked with the symbol * in the site header.

### Features. :sunglasses:
 
1. **Extended the API**
    - There are 6 endpoints in the backend which do fetch their information from TMDB. They all use some kind of parameterised value like id (parameter) or page (query string).
2. **Integration**
    - Frontend and backend apps are connected.
    - Frontend calls 8 endpoints from the backend API. 2 of them are for authentication purposes (login, signup), and 6 of them are to call for movie or famous people information.
3. **Authentication**
    - Simple login and signup are included in the app, accessible in the right section of the site header (via links /login and /signup)
    - Most content on the app is protected, therefore there are a lot of routes protected.
5. **Documentation**
    - API documentation made with Jagger exported in HTML is accessible at https://zalantoth.hu/documentation/moviesapi.html
    - I did upload the corresponding YAML file made with Jagger called openapi-docu.yml

## Setup requirements.

There is no need to install other npm packages to run this application. No need to setup new things.

To run the frontend app (in the react-movies folder): 
`npm start`

To run the backend app (in the movies-api folder):
`npm start`

To run the backend app in dev mode using babel (in the movies-api folder):
`npm run dev`

## API endpoints on the backend. :nerd_face:

Jagger documentation: https://zalantoth.hu/documentation/moviesapi.html

+ (GET) Getting popular people - `/api/movies/tmdb/people?page=${page}`
+ (GET) Getting a specific person - `/api/movies/tmdb/people/${id}`
+ (GET) Getting upcoming movies - `/api/movies/tmdb/upcoming?page=${page}`
+ (GET) Getting trending movies - `/api/movies/tmdb/trending?page=${page}`
+ (GET) Getting movies that are playing - `/api/movies/tmdb/playing?page=${page}`
+ (GET) Getting a specific movie - `/api/movies/tmdb/movies/${id}`
+ (POST) Login - `/api/users`
+ (POST) Signup - `/api/users?action=register`

All these API endpoints are called from frontend instead of directly using TMDB.
Endpoints were tested with Postman so they all should work correctly!

## Routing. :globe_with_meridians:	

#### Authentication routes :shield:
+ `/login` - Login
+ `/signup` - Sign up
+ PROTECTED `/profile` - Says if you are logged in

#### Movie routes :movie_camera:
+ `/movies/discover` OR `/` - Discover movies (same as home)
+ `/movies/discover/page/:page` - Discover movies with current page
+ `/movies/favorites` - List of movies that contains the ones that the user selected as favourites!
+ `/movies/watchlist` - List of movies that contains the ones that the user wants to watch!
+ PROTECTED `/movies/:id` - Provides information about movie
+ PROTECTED `/movies/upcoming` - Provides upcoming movies
+ PROTECTED `/movies/upcoming/page/:page` - Provides upcoming movies with current page
+ PROTECTED `/movies/trending/today` - Provides movies that are trending today
+ PROTECTED `/movies/trending/today/page/:page` - Provides movies that are trending today with current page
+ PROTECTED `/movies/playing` - Provides movies that are currently playing
+ PROTECTED `/movies/playing/page/:page` - Provides movies that are currently playing with current page
+ PROTECTED `/movies/latest` - Gives the latest movie added to TMDB
+ PROTECTED `/similar` OR `/similar/:id` OR `/movies/:id/similar` - Provides similar movies to the given one (stateful and parameterised)
+ PROTECTED `/movies/search` - Searches for movie based on title
+ PROTECTED `/movies/search/:title` - Result of movie search
+ PROTECTED `/movies/search/:title/page/:page` - Result of movie search with pagination support for the result
+ PROTECTED `/movies/:id/credits` - Provides credits for a movie
#### People routes :person_red_hair:
+ PROTECTED `/people/popular` - Provides list of popular people with sorting support with 2 layouts for listing
+ PROTECTED `/people/popular/page/:page` - Provides list of popular people (_||_) with pagination support
+ PROTECTED `/people/:id` - Provides details about a person
+ PROTECTED `/people/:id/credits/movie` - Provides movie credits for person




