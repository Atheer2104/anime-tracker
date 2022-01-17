import React, {useState, useEffect, Dispatch, SetStateAction} from 'react'
import Animecards from './Animecards'
import { IAnime } from '../App';
import axios from 'axios';
import * as ReactSpinner from 'react-spinners';

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
    SetAction: Dispatch<SetStateAction<Array<IAnime>>>;
    urlExtension: string;
}

const BrowselstSection: React.FC<IProps> = ({ Animes, setAnime, title, loggedIn, SetAction, urlExtension}) => {
    const [loading, setLoading] = useState<boolean>(true);


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

            if (favouriteAnime.data.length > 0) {

            await Promise.all(favouriteAnime.data.forEach(async (animeId:string) => {
                console.info(animeId);
                try {
                    const fetchedAnimeData = await fetchAnimeUsingId(animeId);
                    //console.info(fetchedAnimeData.data.attributes.canonicalTitle)
                    await setData(SetAction, fetchedAnimeData.data)
                    setLoading(false);
                } catch(err) {
                    setLoading(false);
                    console.error(err);
                }

                
            }));
        } else {
            setLoading(false);
            console.info("NO SAVED CONTENTS")
        }

        } catch (err) {
            setLoading(false);
            console.error(err);
        }        
    }

    const getData = async(urlExtension: string) => {
        return await axios.get(`http://localhost:3001/api/animes/${urlExtension}`, {
            withCredentials: true
        })
    }

    
    const setData = (setType: Dispatch<SetStateAction<Array<IAnime>>>, animeData: IAnime) => {
        
        return new Promise((resolve) => {
            setType((curState) => [...curState, animeData])
            
            resolve("good");  
        }) 
    }

    const fetchAnimeUsingId = async(animeId: string):Promise<any> => {
        const response = await fetch(`http://localhost:3001/api/animes/fetchsearchedanime/${animeId}`);
        const data = await response.json();
    
        return data.result;
    }

    const resetAnimesList = () => {
        SetAction([])
    }

    return (
        <div className='Browselist-section'>
            <h1>{title}</h1>
            <Animecards Animes={Animes} setAnime={setAnime} isLinkActive={false}/>
            <div className='Spinner'>
                <ReactSpinner.BounceLoader color={"#8783D1"} loading={loading} size={75}/>
            </div>
            
        </div>
    )
}

export default BrowselstSection
