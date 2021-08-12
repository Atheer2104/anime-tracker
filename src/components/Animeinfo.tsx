import React from 'react'  
import { IAnime } from '../App';
import { useHistory } from 'react-router-dom';

interface IProps {
    anime: {
        synopsis: string;
        canonicalTitle: string;
        startDate: string;
        endDate: string | null;
        nextRelease: string | null;
        subtype: string;
        status: string;
        posterImage: {small: string},
        coverImage: { large: string}
    },
    // we don't need to specify every action that we are having beacuase they all do the same thing
    // so to avoid code duplication we pass in an array that contains our arrays of anime [favourites, etc...]
    action: IAnime[][],
    // this is the same for our function we pass in array of actions and we just need to chose correct one 
    // Index 0: Favourites
    // Index 1: Planingtowatch
    // Index 2: Watching
    // Index 3: Completed
    setAction: { (favourites: IAnime[]): void } [];
}

const Animeinfo: React.FC<IProps> = ({ anime, action, setAction }) => {
    const history = useHistory()
    let animeObject = {
        synopsis: anime.synopsis,
        canonicalTitle: anime.canonicalTitle,
        startDate: anime.startDate,
        endDate: anime.endDate,
        nextRelease: anime.nextRelease,
        subtype: anime.subtype,
        status: anime.status,
        posterImage: anime.posterImage,
        coverImage: anime.coverImage
    }

    const handleClick = (e: React.MouseEvent<HTMLButtonElement>):void => {
        let buttonName = e.currentTarget.name;
        
        if (buttonName === 'Favourites') {
            setAction[0]([
            ...action[0],
                animeObject
            ])
            history.push('/Favourites');
        } else if (buttonName === 'Planingtowatch') {
            setAction[1]([
                ...action[1],
                    animeObject
                ])
                history.push('/Planingtowatch');
        }
        else if (buttonName === 'Watching') {
            setAction[2]([
                ...action[2],
                    animeObject
                ])
                history.push('/Watching');
        }
        else if (buttonName === 'Completed') {
            setAction[3]([
                ...action[3],
                    animeObject
                ])
                history.push('/Completed');
        }
    }

    return (
        <div className='Animeinfo'>
            <div className='Animeinfo-banner'>
                <img src={anime.coverImage.large} alt='Anime banner'></img>
            </div>

            <div className='Animeinfo-poster'>
                <img src={anime.posterImage.small} alt='Anime poster'></img>
                <p>{anime.canonicalTitle}</p>

                <div className='Animeinfo-actions'>
                    <button name='Favourites' id='favorites' onClick={handleClick}>Add to Favorites</button>
                    <button name='Planingtowatch' id='planing-to-watch' onClick={handleClick}>Planing to watch</button>
                    <button name='Watching' id='watching' onClick={handleClick}>Add to Watching</button>
                    <button name='Completed' id='completed' onClick={handleClick}>Add to Completed</button>
                </div>
            </div>
            

            <div className='Animeinfo-container'>
                <label>Description:</label>
                <p className='Animeinfo-container-description'>{anime.synopsis}
                </p> 

                <label>Start Date:</label>
                <p>{anime.startDate}</p>

                <label>End Date:</label>
                <p>{anime.endDate}</p>
                
                <label>Next Episode:</label>
                <p>{anime.nextRelease}</p>

                <label>Subtype:</label>
                <p>{anime.subtype}</p>

                <label>Status:</label>
                <p>{anime.status}</p>

                <label>Episode Count:</label>
                <p>null</p>
            </div>
        </div>
    )
}

export default Animeinfo
