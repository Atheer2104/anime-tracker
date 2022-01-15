import {NextFunction, Request, Response} from 'express';
import { get } from 'lodash';
import { cleanAnime, createEmptyAnimeList, findAnime, updateFavouriteAnimeIds, updatePlaningToWatchAnimeIds,
        updateWatchingAnimeIds, updateCompletedAnimeIds, animeAlreadyExitsInFavourites, animeAlreadyExitsInPlaningToWatch
        , animeAlreadyExitsInWatching, animeAlreadyExitsInCompleted} from '../service/anime.service';

export async function createEmptyAnimeListHandler(req: Request, res: Response) {
    // we should have a user becuase requiresUser middleware ran before this 
    const { _id } = req.body;

    // if anime id is avaliable then create a new document with anime id

    const anime = await createEmptyAnimeList(_id);

    console.info(anime);

    // clean anime 

    //await cleanAnime(userId);

    // return 201 anime was created 

    res.status(201).send(req.body);
}

enum Routes {
    favouriteAnimesIDs = "favouriteAnimesIDs",
    planingToWatchAnimeIDs = "planingToWatchAnimeIDs",
    watchingAnimeIDs = "watchingAnimeIDs",
    completedAnimeIDs = "completedAnimeIDs",
    None = "none"
}


function SelectedUpdateType(favouriteAnimesIDs:any,planingToWatchAnimeIDs: any, watchingAnimeIDs:any, completedAnimeIDs:any): Routes {
   var selectedType:Routes = Routes.None;

   if (!(favouriteAnimesIDs || planingToWatchAnimeIDs || watchingAnimeIDs || completedAnimeIDs)) {
       return selectedType;
   }

    if(favouriteAnimesIDs) {
       selectedType = Routes.favouriteAnimesIDs;
    } else if(planingToWatchAnimeIDs) {
        selectedType = Routes.planingToWatchAnimeIDs;
    } else if(watchingAnimeIDs) {
        selectedType = Routes.watchingAnimeIDs;
    } else if(completedAnimeIDs) {
        selectedType = Routes.completedAnimeIDs;
    }

   return selectedType;
}

export async function getAnimeHandler(req: Request, res: Response) {
    // we should have a user becuase requiresUser middleware ran before this 
    const userId = get(req, "user._id");
    const url = req.originalUrl;
 
    // find the following anime by using userID
    const anime = await findAnime({ userId })
    var selectedData: [string];
    switch(url) {
        case "/api/animes/favourites":
            selectedData = anime.favouriteAnimesIDs;
            break;
        case "/api/animes/planingtowatch":
            selectedData = anime.planingToWatchAnimeIDs;
            break;
        case "/api/animes/watching":
            selectedData = anime.watchingAnimeIDs;
            break;
        case "/api/animes/completed":
            selectedData = anime.completedAnimeIDs;
            break;
    }

    res.status(200).json(selectedData);
}

export async function updateAnimeHandler(req: Request, res: Response) {
    // we should have a user becuase requiresUser middleware ran before this 
    const userId = get(req, "user._id");
    const url = req.originalUrl;
 
    // find the following anime by using userID
    const anime = await findAnime({ userId })

    // get the updated data from req.body
    
    // get anime ids
    const { favouriteAnimesIDs, planingToWatchAnimeIDs, watchingAnimeIDs, completedAnimeIDs} = req.body;

    const updateType = SelectedUpdateType(favouriteAnimesIDs, planingToWatchAnimeIDs, watchingAnimeIDs, completedAnimeIDs);
    console.log(updateType);

    // make sure data is not empty

    // if anime id not available retun 400 bad request 
    if (updateType == Routes.None) {
        res.status(400).send("invalid Request none animeIDs provided");
    }

    var update;

    // update the anime data
    switch (updateType) {
        case Routes.favouriteAnimesIDs:
            update = await updateFavouriteAnimeIds(userId, favouriteAnimesIDs);
            break;
        case Routes.planingToWatchAnimeIDs:
            update = await updatePlaningToWatchAnimeIds(userId, planingToWatchAnimeIDs);
            break;
        case Routes.watchingAnimeIDs:
            update = await updateWatchingAnimeIds(userId, watchingAnimeIDs);
            break;
        case Routes.completedAnimeIDs:
            update = await updateCompletedAnimeIds(userId, completedAnimeIDs);
            break;    
    }

    console.info(update);

    // return new anime data 

    res.status(200).send("updated succesfully");
}

export async function checkIfAnimeExists(req: Request, res: Response, next: NextFunction) {
    // we should have a user becuase requiresUser middleware ran before this 
    const userId = get(req, "user._id");
    const url = req.originalUrl;
 
    // find the following anime by using userID
    const anime = await findAnime({ userId })

    // get the updated data from req.body
    
    // get anime ids
    const { favouriteAnimesIDs, planingToWatchAnimeIDs, watchingAnimeIDs, completedAnimeIDs} = req.body;

    const updateType = SelectedUpdateType(favouriteAnimesIDs, planingToWatchAnimeIDs, watchingAnimeIDs, completedAnimeIDs);
    //console.log(updateType);

    // make sure data is not empty

    // if anime id not available retun 400 bad request 
    if (updateType == Routes.None) {
        res.status(400).send("invalid Request none animeIDs provided");
    }

    var animeExists;

    switch (updateType) {
        case Routes.favouriteAnimesIDs:
            animeExists = await animeAlreadyExitsInFavourites(userId, favouriteAnimesIDs);
            break;
        case Routes.planingToWatchAnimeIDs:
            animeExists = await animeAlreadyExitsInPlaningToWatch(userId, planingToWatchAnimeIDs);
            break;
        case Routes.watchingAnimeIDs:
            animeExists = await animeAlreadyExitsInWatching(userId, watchingAnimeIDs);
            break;
        case Routes.completedAnimeIDs:
            animeExists = await animeAlreadyExitsInCompleted(userId, completedAnimeIDs);
            break;    
    }

    if (animeExists.length === 0) {
        //console.info("this anime is not a duplicate");
        //console.info(animeExists);
        return next();
    }

    res.status(403).send("This anime is already added not accepting any duplicates");


}