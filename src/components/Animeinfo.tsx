import React from 'react'   

interface IProps {
    anime: {
        synopsis: string;
        canonicalTitle: string;
        startDate: string;
        endDate: string | null;
        nextRelease: string | null;
        subtype: string;
        status: string;
        posterImage: {small: string},
        coverImage: { large: string}
    }
}

const Animeinfo: React.FC<IProps> = ({ anime }) => {
    return (
        <div className='Animeinfo'>
            <div className='Animeinfo-banner'>
                <img src={anime.coverImage.large} alt='Anime banner'></img>
            </div>

            <div className='Animeinfo-poster'>
                <img src={anime.posterImage.small} alt='Anime poster'></img>
                <p>{anime.canonicalTitle}</p>
            </div>

            <div className='Animeinfo-container'>
                <label>Description:</label>
                <p className='Animeinfo-container-description'>{anime.synopsis}
                </p> 

                <label>Start Date:</label>
                <p>{anime.startDate}</p>

                <label>End Date:</label>
                <p>{anime.endDate}</p>
                
                <label>Next Episode:</label>
                <p>{anime.nextRelease}</p>

                <label>Subtype:</label>
                <p>{anime.subtype}</p>

                <label>Status:</label>
                <p>{anime.status}</p>

                <label>Episode Count:</label>
                <p>null</p>

            </div>
        </div>
    )
}

export default Animeinfo
