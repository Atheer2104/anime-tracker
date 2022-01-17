import {Express, Request, Response} from 'express';
import { createUserSessionHandler, invalidateUserSessionHandler, getUserSessionsHandler} from './controller/session.controller';
import { registerUserHandler} from './controller/user.controller';
import { requiresUser } from './middleware/requiresUser';
import { createEmptyAnimeListHandler, updateAnimeHandler, getAnimeHandler, checkIfAnimeExists, fetchTrendingAnimes, fetchForAnimes, fetchForAnime} from './controller/anime.controller';
import { setCookie, getCookie } from './controller/cookie.controller';
import { sessionAlreadyExists } from './middleware/sessionHandler';


export default function(app: Express) {

    // API check
    app.get('/api/healthcheck', (req: Request, res: Response) => res.sendStatus(200));

    // create user 
    app.post("/api/users", registerUserHandler, createEmptyAnimeListHandler);

    // user sign in via this to create a session 
    app.post("/api/sessions", createUserSessionHandler);

    // logout the user 
    app.delete("/api/sessions" , requiresUser, invalidateUserSessionHandler);

    // get all user sessions 
    app.get("/api/sessions", requiresUser, getUserSessionsHandler);

    app.get("/api/sessionexists", sessionAlreadyExists);

    // fetch Anime category
    app.get("/api/animes/favourites", requiresUser, getAnimeHandler)

    app.get("/api/animes/planingtowatch", requiresUser, getAnimeHandler)

    app.get("/api/animes/watching", requiresUser, getAnimeHandler)

    app.get("/api/animes/completed", requiresUser, getAnimeHandler)


    // update anime 
    app.patch("/api/animes/favourites", requiresUser, checkIfAnimeExists, updateAnimeHandler);

    app.patch("/api/animes/planingtowatch", requiresUser, checkIfAnimeExists, updateAnimeHandler);

    app.patch("/api/animes/watching", requiresUser, checkIfAnimeExists, updateAnimeHandler);

    app.patch("/api/animes/completed", requiresUser, checkIfAnimeExists, updateAnimeHandler);


    app.get("/api/animes/fetchtrendinganimes", fetchTrendingAnimes);

    app.get("/api/animes/fetchmultipleanimes/:searchterm", fetchForAnimes);
    
    app.get("/api/animes/fetchsearchedanime/:animeId", fetchForAnime);



    // session testing only 

    app.get("/api/setcookie", setCookie);

    app.get("/api/getcookie", getCookie);

    
   

    // delete anime - later 


    

    
}   

