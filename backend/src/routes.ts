import {Express, Request, Response} from 'express';
import { createUserSessionHandler, invalidateUserSessionHandler, getUserSessionsHandler} from './controller/session.controller';
import { registerUserHandler} from './controller/user.controller';
import { verifyToken } from './middleware/auth';
import { requiresUser } from './middleware/requiresUser';
import { createEmptyAnimeListHandler, updateAnimeHandler, getAnimeHandler} from './controller/anime.controller';

export default function(app: Express) {

    app.get('/api/healthcheck', (req: Request, res: Response) => res.sendStatus(200));

    // create user 
    app.post("/api/users", registerUserHandler, createEmptyAnimeListHandler);

    // user sign in via this to create a session 
    app.post("/api/sessions", createUserSessionHandler);

    // logout the user 
    app.delete("/api/sessions" ,requiresUser, invalidateUserSessionHandler);

    // get all user sessions 
    app.get("/api/sessions", requiresUser, getUserSessionsHandler);

    // create anime for first time 
    //app.post("/api/animes", requiresUser ,createAnimeHandler);

    // fetch Anime category
    app.get("/api/animes/favourites", requiresUser, getAnimeHandler)

    app.get("/api/animes/planingtowatch", requiresUser, getAnimeHandler)

    app.get("/api/animes/watching", requiresUser, getAnimeHandler)

    app.get("/api/animes/completed", requiresUser, getAnimeHandler)


    // update anime 
    app.patch("/api/animes/favourites", requiresUser, updateAnimeHandler);

    app.patch("/api/animes/planingtowatch", requiresUser, updateAnimeHandler);

    app.patch("/api/animes/watching", requiresUser, updateAnimeHandler);

    app.patch("/api/animes/completed", requiresUser, updateAnimeHandler);

   

    // delete anime - later 


    

    
}   

