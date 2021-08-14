import React, {useEffect} from 'react'
import { useState } from 'react';
import { IAnime } from '../App';

interface IProps {
    initialAnimeState: IAnime[],
    animes: IAnime[],
    setAnimes: (anime: IAnime[]) => void;
}


const SearchBar:React.FC<IProps> = ({ initialAnimeState, animes, setAnimes }) => {
    const [input, setInput] = useState<string>("")

    useEffect(() => {
        const timeOutId = setTimeout(() => handleChange(input), 200);
        return () => clearTimeout(timeOutId);
    }, [input]) // eslint-disable-line react-hooks/exhaustive-deps


    const fetchAnimesBySearch = async(q: string):Promise<any> => {
        const response = await fetch(`https://kitsu.io/api/edge/anime?filter%5Btext%5D=${q}&page%5Blimit%5d=20`);
        const data = await response.json();

        return data
    }

    const getAnimesBySearch = async(q:string) => {
        const dataFromServer = await fetchAnimesBySearch(q);
            
        setAnimes(dataFromServer.data);   
    }

    const handleChange = (q: string):void => {
        console.log(input);
        
        if (q === "") {   
            setAnimes(initialAnimeState);
            console.log('reset');
        } else {
            getAnimesBySearch(q);
            console.log('fetched data');
        }
    }

    return (
        <div className='searchBar'>
            <input type='text' placeholder='search for an anime' value={input} onChange={event => setInput(event.target.value)} />
        </div>
    )
}

export default SearchBar
