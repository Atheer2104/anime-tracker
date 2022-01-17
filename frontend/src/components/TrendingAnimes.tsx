import React, {useEffect, Dispatch, SetStateAction} from 'react';
import Animecards from "./Animecards";
import { IAnime } from '../App';


interface IProps {
    animes: IAnime[];
    setAnimes: Dispatch<SetStateAction<IAnime[]>>;
    setAnime: Dispatch<SetStateAction<IAnime>>;
}

const TrendingAnimes:React.FC<IProps> = ({ animes, setAnimes, setAnime }) => {
  useEffect(() => {
    const getTrendingAnimes = async() => {
      const dataFromServer = await fetchTrendingAnimes();
      setAnimes(dataFromServer.data);
    }

    getTrendingAnimes();
  }, [])
  

  const fetchTrendingAnimes = async():Promise<any> => {
    const response = await fetch("http://localhost:3001/api/animes/fetchtrendinganimes");
    const data = await response.json();

    return data.result
}


    return (
        <div>
            <h1>Trending animes</h1>
            <Animecards Animes={animes} setAnime={setAnime} isLinkActive={true}/>
        </div>
    )
}

export default TrendingAnimes
