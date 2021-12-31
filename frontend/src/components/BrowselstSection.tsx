import React, {useEffect, Dispatch, SetStateAction} from 'react'
import Animecards from './Animecards'
import { IAnime } from '../App';
import axios from 'axios';

interface IProps {
    Animes: ({
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
    })[]
    setAnime: (anime: IAnime) => void;
    title: string;
    loggedIn: Boolean;
    accessToken: string; 
    refreshToken: string;
    SetAction: Dispatch<SetStateAction<Array<IAnime>>>;
    urlExtension: string;
}

const BrowselstSection: React.FC<IProps> = ({ Animes, setAnime, title, loggedIn, accessToken, refreshToken, SetAction, urlExtension}) => {
    useEffect(() => {
        if (loggedIn) {
            resetAnimesList()

            fetchData(urlExtension);
        }
        
        // eslint-disable-next-line
    }, [])

    const fetchData = async(urlExtension: string) => {
        try {
            const favouriteAnime = await getData(urlExtension);

            await Promise.all(favouriteAnime.data.forEach(async (animeId:string) => {
                console.info(animeId);
                try {
                    const fetchedAnimeData = await fetchAnimeUsingId(animeId);
                    //console.info(fetchedAnimeData.data.attributes.canonicalTitle)
                    await setData(SetAction, fetchedAnimeData.data)
                } catch(err) {
                    console.error(err);
                }

                
            }));

        }catch (err) {
            console.error(err);
        }        
    }

    const getData = async(urlExtension: string) => {
        return await axios.get(`http://localhost:3001/api/animes/${urlExtension}`, {
            headers: {
                'x-refresh': `${refreshToken}`,
                'authorization': `${accessToken}`
            }
        })
    }

    
    const setData = (setType: Dispatch<SetStateAction<Array<IAnime>>>, animeData: IAnime) => {
        
        return new Promise((resolve) => {
            setType((curState) => [...curState, animeData])
            
            resolve("good");  
        }) 
    }

    const fetchAnimeUsingId = async(animeId: string):Promise<any> => {
        const response = await fetch(`https://kitsu.io/api/edge/anime/${animeId}`);
        const data = await response.json();
    
        return data
    }

    const resetAnimesList = () => {
        SetAction([])
    }

    return (
        <div className='Browselist-section'>
            <h1>{title}</h1>
            <Animecards Animes={Animes} setAnime={setAnime} isLinkActive={false}/>
        </div>
    )
}

export default BrowselstSection
