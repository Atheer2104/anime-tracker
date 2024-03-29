import React from 'react'  
import { useHistory } from 'react-router-dom';
import axios from 'axios';

interface IProps {
    accessToken: string, 
    refreshToken: string
    anime: {
        id: string,
        attributes: {
            synopsis: string;
            canonicalTitle: string;
            startDate: string;
            endDate: string | null;
            nextRelease: string | null;
            subtype: string;
            status: string;
            posterImage: {
                small: string;
            };
            coverImage: {
                large: string;
            } | null;
            episodeCount: number | null
        }
    },

}

const Animeinfo: React.FC<IProps> = ({ anime, accessToken, refreshToken}) => {
    const history = useHistory()
    const coverImageIfNotFound: string = "https://images.unsplash.com/photo-1557682250-33bd709cbe85?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&h=800&q=80"
    let animeObject = {
        id: anime.id,
        attributes: {
            synopsis: anime.attributes.synopsis,
            canonicalTitle: anime.attributes.canonicalTitle,
            startDate: anime.attributes.startDate,
            endDate: anime.attributes.endDate,
            nextRelease: anime.attributes.nextRelease,
            subtype: anime.attributes.subtype,
            status: anime.attributes.status,
            posterImage: anime.attributes.posterImage,
            coverImage: anime.attributes.coverImage,
            episodeCount: anime.attributes.episodeCount
        }
    }

    const headers = {
        'x-refresh': `${refreshToken}`,
        'authorization': `${accessToken}`
    }

    const handleClick = (e: React.MouseEvent<HTMLButtonElement>):void => {
        let buttonName = e.currentTarget.name;
        

        if (buttonName === 'Favourites') { 
            const data = {
                favouriteAnimesIDs: [animeObject.id]
            }

            axios.patch('http://localhost:3001/api/animes/favourites', data, {
                headers: headers
            })

            history.push('/');
        } else if (buttonName === 'Planingtowatch') {
            const data = {
                planingToWatchAnimeIDs: [animeObject.id]
            }

            axios.patch('http://localhost:3001/api/animes/planingtowatch', data, {
                headers: headers
            })

            history.push('/Planingtowatch');
        }
        else if (buttonName === 'Watching') {
            const data = {
                watchingAnimeIDs: [animeObject.id]
            }

            axios.patch('http://localhost:3001/api/animes/watching', data, {
                headers: headers
            })

            history.push('/Watching');
        }
        else if (buttonName === 'Completed') {
            const data = {
                completedAnimeIDs: [animeObject.id]
            }
            
            axios.patch('http://localhost:3001/api/animes/completed', data, {
                headers: headers
            })

            history.push('/Completed');
        }
        
    }

    return (
        <div className='Animeinfo'>
            <div className='Animeinfo-banner'>
                <img src={anime.attributes.coverImage?.large == null ? coverImageIfNotFound : anime.attributes.coverImage?.large} alt='Anime banner'></img>
            </div>

            <div className='Animeinfo-poster'>
                <img src={anime.attributes.posterImage.small} alt='Anime poster'></img>
                <p>{anime.attributes.canonicalTitle}</p>

                <div className='Animeinfo-actions'>
                    <button name='Favourites' id='favorites' onClick={handleClick}>Add to Favorites</button>
                    <button name='Planingtowatch' id='planing-to-watch' onClick={handleClick}>Planing to watch</button>
                    <button name='Watching' id='watching' onClick={handleClick}>Add to Watching</button>
                    <button name='Completed' id='completed' onClick={handleClick}>Add to Completed</button>
                </div>
            </div>
            

            <div className='Animeinfo-container'>
                <label>Description:</label>
                <p className='Animeinfo-container-description'>{anime.attributes.synopsis}
                </p> 

                <label>Start Date:</label>
                <p>{anime.attributes.startDate}</p>

                <label>End Date:</label>
                <p>{anime.attributes.endDate == null ? 'No information' : anime.attributes.endDate}</p>
                
                <label>Next Episode:</label>
                <p>{anime.attributes.nextRelease == null ? 'No information' : anime.attributes.nextRelease}</p>

                <label>Subtype:</label>
                <p>{anime.attributes.subtype}</p>

                <label>Status:</label>
                <p>{anime.attributes.status}</p>

                <label>Episode Count:</label>
                <p>{anime.attributes.episodeCount == null ? 'No information' : anime.attributes.episodeCount}</p>
            </div>
        </div>
    )
}

export default Animeinfo
