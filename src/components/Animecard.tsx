import React from 'react'
import { Link } from 'react-router-dom';
import { IAnime } from '../App';

interface IProps {
    anime: {
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
    }, 
    setAnime: (anime: IAnime) => void;
    isLinkActive: Boolean
}

const Animecard: React.FC<IProps> = ({ anime, setAnime, isLinkActive}) => {
    return (
            <Link to='/Animeinfo' onClick={() => setAnime(anime)} className={isLinkActive ? '' : 'disable-link '}>
                <div>
                    <img src={anime.posterImage.small} alt='Anime poster'></img>
                    <span>{anime.canonicalTitle}</span>
                </div>
            </Link>
    )
}

export default Animecard
