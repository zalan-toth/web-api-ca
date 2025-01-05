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
    - There are 6 endpoints which do fetch their information from TMDB. They all use some kind of parameterised value like id (parameter) or page (query string).
2. **Integration**
    - Frontend and backend apps are connected.
    - Frontend calls 8 endpoints from the backend API. 2 of them are for authentication purposes (login, signup), and 6 of them are to call movie or famous people information.
3. **Authentication**
    - Simple login and signup are included in the app, accessible in the right section of the site header (via links /login and /signup)
    - Most content on the app is protected, therefore there are several routes protected.
5. **Documentation**
    - TODO

## Setup requirements.

There is no need to install other npm packages to run this application. No need to setup new things.

To run the frontend app (in the react-movies folder): 
`npm start`

To run the backend app (in the movies-api folder):
`npm start`

To run the backend app in dev mode using babel (in the movies-api folder):
`npm run dev`

## API endpoints on the backend. :nerd_face:

+ (GET) Getting popular people - `/api/movies/tmdb/people?page=${page}`
+ (GET) Getting a specific person - `/api/movies/tmdb/person/${id}`
+ (GET) Getting upcoming movies - `/api/movies/tmdb/upcoming?page=${page}`
+ (GET) Getting trending movies - `/api/movies/tmdb/trending?page=${page}`
+ (GET) Getting movies that are playing - `/api/movies/tmdb/playing?page=${page}`
+ (GET) Getting a specific movie - `/api/movies/tmdb/movie/${id}`
+ (POST) Login - `/api/users`
+ (POST) Signup - `/api/users?action=register`




