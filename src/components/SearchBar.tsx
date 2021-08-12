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

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>):void => {
        setInput(e.target.value)
        
        if (e.target.value === "") {   
            setAnimes(initialAnimeState)
        } else {
            setAnimes(initialAnimeState.filter((anime) => anime.canonicalTitle.toLowerCase().includes(e.target.value)))   
        }
    }

    return (
        <div className='searchBar'>
            <input type='text' placeholder='search for an anime' value={input} onChange={handleChange} />
        </div>
    )
}

export default SearchBar
