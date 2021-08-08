import React from 'react'
import Animecard from './Animecard'
import { IAnime } from '../App';

interface IProps {
    Animes: ({
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
        };
    })[]
    setAnime: (anime: IAnime) => void;
}

const Animecards: React.FC<IProps> = ({ Animes, setAnime }) => {
    return (
        <div className='Animecard'>
           {Animes.map((anime) => (<Animecard anime={anime} setAnime={setAnime}/>))}
        </div>
    )
}

export default Animecards
