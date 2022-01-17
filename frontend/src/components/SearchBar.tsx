import React, {useEffect, Dispatch, SetStateAction} from 'react'
import { useState } from 'react';
import { IAnime } from '../App';
import axios from 'axios';

interface IProps {
    setEmptySearch: Dispatch<SetStateAction<Boolean>>;
    setAnimes: Dispatch<SetStateAction<IAnime[]>>;
}

const SearchBar:React.FC<IProps> = ({ setEmptySearch, setAnimes }) => {
    const [input, setInput] = useState<string>("")

    useEffect(() => {
        const timeOutId = setTimeout(() => handleChange(input), 200);
        return () => clearTimeout(timeOutId);
    }, [input]) // eslint-disable-line react-hooks/exhaustive-deps


    const fetchAnimesBySearch = async(q: string):Promise<any> => {
        await axios.get(`http://localhost:3001/api/animes/fetchmultipleanimes/${q}`)
        .then(res => {
            //console.info(res.data.result.data);
            setAnimes(res.data.result.data); 
            
        })
        .catch(err => {
            console.error(err);
        })
    }

    const handleChange = (q: string):void => {
        console.log(input);
        
        if (q === "") {   
            console.log("Seatch is Empty");
            // get trending anime 
            setEmptySearch(true);
            setAnimes([]);
            
    
        } else {
            setEmptySearch(false);
            fetchAnimesBySearch(q);
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
