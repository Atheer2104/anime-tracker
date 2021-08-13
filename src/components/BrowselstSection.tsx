import React from 'react'
import Animecards from './Animecards'
import { IAnime } from '../App';

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
    title: string
}

const BrowselstSection: React.FC<IProps> = ({ Animes, setAnime, title}) => {
    return (
        <div className='Browselist-section'>
            <h1>{title}</h1>
            <Animecards Animes={Animes} setAnime={setAnime} isLinkActive={false}/>
        </div>
    )
}

export default BrowselstSection
