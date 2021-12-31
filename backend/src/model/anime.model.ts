import mongoose from 'mongoose';
import { UserDocument} from './user.model';

export interface AnimeDocument extends mongoose.Document {
    userId: UserDocument["_id"], 
    favouriteAnimesIDs: [string], 
    planingToWatchAnimeIDs: [string],
    watchingAnimeIDs: [string],
    completedAnimeIDs: [string]
}

const AnimeSchema = new mongoose.Schema({
    userId: { type: mongoose.Types.ObjectId, ref: "User"},
    favouriteAnimesIDs: [{type: String, default: [""]}], 
    planingToWatchAnimeIDs: [{type: String, default: [""]}], 
    watchingAnimeIDs: [{type: String, default:[""]}], 
    completedAnimeIDs: [{type: String, default:[""]}], 

})

const Anime = mongoose.model<AnimeDocument>("anime", AnimeSchema);

export default Anime;