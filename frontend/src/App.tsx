import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Switch, } from "react-router-dom";
import "./scss/App.scss";
import Header from "./components/Header";
import SearchBar from "./components/SearchBar";
import Signup from "./components/Signup";
import Login from "./components/Login";
import Animecards from "./components/Animecards";
import Animeinfo from "./components/Animeinfo";
import Browselist from './components/Browselist';
import BrowselstSection from './components/BrowselstSection';
import TrendingAnimes from './components/TrendingAnimes';

export interface IAnime {
  id: string,
  attributes: {
    synopsis: string;
    canonicalTitle: string;
    startDate: string;
    endDate: string | null;
    nextRelease: string | null;
    subtype: string;
    status: string;
    posterImage: { small: string};
    coverImage: { large: string} | null;
    episodeCount: number | null;
  }
}

export interface Users {
  users: {
    email: string,
    username: string,
    password: string
  }[]
}
const App: React.FC = () => {  

  
// generel collection of animes that acts as db 
  const [animes, setAnimes] = useState<IAnime[]>([])
  // this collection is used to know what anime to show when user press animecard
  const [anime, setAnime] = useState<IAnime>({
    id: "1555",
    attributes: {
      synopsis: "It has been two and a half years since Naruto Uzumaki left Konohagakure, the Hidden Leaf Village, for intense training following events which fueled his desire to be stronger. Now Akatsuki, the mysterious organization of elite rogue ninja, is closing in on their grand plan which may threaten the safety of the entire shinobi world.\n\nAlthough Naruto is older and sinister events loom on the horizon, he has changed little in personality—still rambunctious and childish—though he is now far more confident and possesses an even greater determination to protect his friends and home. Come whatever may, Naruto will carry on with the fight for what is important to him, even at the expense of his own body, in the continuation of the saga about the boy who wishes to become Hokage.\n\n(Source: MAL Rewrite)",
      canonicalTitle: "Naruto: Shippuuden",
      startDate: "2007-02-15",
      endDate: "2017-03-23",
      nextRelease: null,
      subtype: "TV",
      status: "finished",
      posterImage: { small: "https://media.kitsu.io/anime/poster_images/1555/small.jpg?1597696875"},
      coverImage: { large: "https://media.kitsu.io/anime/cover_images/1555/large.jpg?1597702491"},
      episodeCount: 500
    }
  })

  const [loggdeIn, setLoggedin] = useState<Boolean>(false);
  
  const [favourites, setFavourites] = useState<Array<IAnime>>([])

  const [planingtowatch, setplaningtowatch] = useState<IAnime[]>([])

  const [watching, setwatching] = useState<IAnime[]>([])

  const [completed, setcompleted] = useState<IAnime[]>([])

  const [accessToken, setAccessToken] = useState<string>("");

  const [refreshToken, setrefreshToken] = useState<string>("");

  const [emptySearch, setEmptySearch] = useState<Boolean>(false);

  return (
    <Router>
      <div className="App">
        <Switch>
        <Route path='/Favourites'>
            <Header loggedIn={loggdeIn} accessToken={accessToken} refreshToken={refreshToken}/>
            <BrowselstSection Animes={favourites} setAnime={setAnime} title={'Favourites'} loggedIn={loggdeIn} accessToken={accessToken} refreshToken={refreshToken} SetAction={setFavourites} urlExtension='favourites'/>
          </Route>
        <Route path='/Planingtowatch'>
            <Header loggedIn={loggdeIn} accessToken={accessToken} refreshToken={refreshToken}/>
            <BrowselstSection Animes={planingtowatch} setAnime={setAnime} title={'Planing to Watch'} loggedIn={loggdeIn} accessToken={accessToken} refreshToken={refreshToken} SetAction={setplaningtowatch} urlExtension='planingtowatch'/>
          </Route>
        <Route path='/Watching'>
            <Header loggedIn={loggdeIn} accessToken={accessToken} refreshToken={refreshToken}/>
            <BrowselstSection Animes={watching} setAnime={setAnime} title={'Watching'} loggedIn={loggdeIn} accessToken={accessToken} refreshToken={refreshToken} SetAction={setwatching} urlExtension='watching'/>
          </Route>
        <Route path='/Completed'>
            <Header loggedIn={loggdeIn} accessToken={accessToken} refreshToken={refreshToken}/>
            <BrowselstSection Animes={completed} setAnime={setAnime} title={'Completed'} loggedIn={loggdeIn} accessToken={accessToken} refreshToken={refreshToken} SetAction={setcompleted} urlExtension='completed'/>
          </Route>
        <Route path='/Browselist'>
            <Header loggedIn={loggdeIn} accessToken={accessToken} refreshToken={refreshToken}/>
            <Browselist/>
          </Route>
          <Route path='/Signup'>
            <Header loggedIn={loggdeIn} accessToken={accessToken} refreshToken={refreshToken}/>
            <Signup setLoggedin={setLoggedin} />
          </Route>
          <Route path='/Login'>
            <Header loggedIn={loggdeIn} accessToken={accessToken} refreshToken={refreshToken}/>
            <Login setLoggedin={setLoggedin} setAccessToken={setAccessToken} setRefreshToken={setrefreshToken}/>
          </Route>
          <Route path='/Animeinfo'>
            <Header loggedIn={loggdeIn} accessToken={accessToken} refreshToken={refreshToken}/>
            <Animeinfo accessToken={accessToken} refreshToken={refreshToken} anime={anime} />
            </Route>
          <Route path='/'>
            <Header loggedIn={loggdeIn} accessToken={accessToken} refreshToken={refreshToken}/>
            <SearchBar setEmptySearch={setEmptySearch} setAnimes={setAnimes}/>
            {emptySearch ? <TrendingAnimes animes={animes} setAnimes={setAnimes} setAnime={setAnime}/> : <Animecards Animes={animes} setAnime={setAnime} isLinkActive={true}/>}
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
