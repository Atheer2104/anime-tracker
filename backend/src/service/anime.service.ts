import { FilterQuery } from "mongoose";
import Anime, { AnimeDocument } from "../model/anime.model";

export async function createEmptyAnimeList(userId: string) {
    
    const anime = await Anime.create({userId})

    return anime.toJSON(); 
}

export async function findAnime(query: FilterQuery<AnimeDocument>) {
    return await Anime.findOne(query);
}

export async function cleanAnime(userId: string) {
    return await Anime.updateOne({userId}, {$pullAll: { favouriteAnimesIDs: [""], planingToWatchAnimeIDs: [""], watchingAnimeIDs:[""], completedAnimeIDs:[""]}}) 
}

export async function updateFavouriteAnimeIds(userId: string, animeIDs: any) {
    return await Anime.updateOne({userId}, {$push: {favouriteAnimesIDs: {$each: animeIDs}}})
}

export async function animeAlreadyExitsInFavourites(animeId: string) {

}

export async function updatePlaningToWatchAnimeIds(userId: string, animeIDs: any) {
    return await Anime.updateOne({userId}, {$push: {planingToWatchAnimeIDs: {$each: animeIDs}}})
}

export async function updateWatchingAnimeIds(userId: string, animeIDs: any) {
    return await Anime.updateOne({userId}, {$push: {watchingAnimeIDs: {$each: animeIDs}}})
}

export async function updateCompletedAnimeIds(userId: string, animeIDs: any) {
    return await Anime.updateOne({userId}, {$push: {completedAnimeIDs: {$each: animeIDs}}})
}