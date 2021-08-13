import React from 'react'
import { useState } from 'react';
import { IAnime } from '../App';

interface IProps {
    initialAnimeState: IAnime[],
    animes: IAnime[],
    setAnimes: (anime: IAnime[]) => void;
}


const SearchBar:React.FC<IProps> = ({ initialAnimeState, animes, setAnimes }) => {
    const [input, setInput] = useState<string>("")

    const fetchAnimesBySearch = async(q: string):Promise<any> => {
        const response = await fetch(`https://kitsu.io/api/edge/anime?filter%5Btext%5D=${q}&page%5Blimit%5d=20`);
        const data = await response.json();

        return data
    }

    const getAnimesBySearch = async(q:string) => {
        const dataFromServer = await fetchAnimesBySearch(q);
            
        setAnimes(dataFromServer.data);   
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>):void => {
        setInput(e.target.value);
        console.log(e.target.value);
        
        if (e.target.value === "") {   
            setAnimes(initialAnimeState);
        } else {
            getAnimesBySearch(e.target.value);
        }
    }

    return (
        <div className='searchBar'>
            <input type='text' placeholder='search for an anime' value={input} onChange={handleChange} />
        </div>
    )
}

export default SearchBar
