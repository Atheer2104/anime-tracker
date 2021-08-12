import React from 'react'
import Animecard from './Animecard'
import { IAnime } from '../App';

export interface IProps {
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
    isLinkActive: Boolean
}

const Animecards: React.FC<IProps> = ({ Animes, setAnime, isLinkActive}) => {
    return (
        <div className='Animecard'>
           {Animes.map((anime) => (<Animecard anime={anime} setAnime={setAnime} isLinkActive={isLinkActive}/>))}
        </div>
    )
}

export default Animecards
