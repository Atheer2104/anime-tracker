import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Switch, } from "react-router-dom";
import "./scss/App.scss";
import Header from "./components/Header";
import SearchBar from "./components/SearchBar";
import Signup from "./components/Signup";
import Login from "./components/Login";
import Animecards from "./components/Animecards";
import Animeinfo from "./components/Animeinfo";

export interface IAnime {
  synopsis: string;
  canonicalTitle: string;
  startDate: string;
  endDate: string | null;
  nextRelease: string | null;
  subtype: string;
  status: string;
  posterImage: {small: string};
  coverImage: { large: string}
}

export interface Users {
  users: {
    email: string,
    username: string,
    password: string
  }[]
}

function App() {  
  const initialAnimeState: IAnime[] = [
    {
      synopsis: "It has been two and a half years since Naruto Uzumaki left Konohagakure, the Hidden Leaf Village, for intense training following events which fueled his desire to be stronger. Now Akatsuki, the mysterious organization of elite rogue ninja, is closing in on their grand plan which may threaten the safety of the entire shinobi world.\n\nAlthough Naruto is older and sinister events loom on the horizon, he has changed little in personality—still rambunctious and childish—though he is now far more confident and possesses an even greater determination to protect his friends and home. Come whatever may, Naruto will carry on with the fight for what is important to him, even at the expense of his own body, in the continuation of the saga about the boy who wishes to become Hokage.\n\n(Source: MAL Rewrite)",
      canonicalTitle: "Naruto: Shippuuden",
      startDate: "2007-02-15",
      endDate: "2017-03-23",
      nextRelease: null,
      subtype: "TV",
      status: "finished",
      posterImage: { small: "https://media.kitsu.io/anime/poster_images/1555/small.jpg?1597696875"},
      coverImage: { large: "https://media.kitsu.io/anime/cover_images/1555/large.jpg?1597702491"}
    },
    {
      synopsis: "Gol D. Roger was known as the \"Pirate King,\" the strongest and most infamous being to have sailed the Grand Line. The capture and death of Roger by the World Government brought a change throughout the world. His last words before his death revealed the existence of the greatest treasure in the world, One Piece. It was this revelation that brought about the Grand Age of Pirates, men who dreamed of finding One Piece—which promises an unlimited amount of riches and fame—and quite possibly the pinnacle of glory and the title of the Pirate King.\nEnter Monkey D. Luffy, a 17-year-old boy who defies your standard definition of a pirate. Rather than the popular persona of a wicked, hardened, toothless pirate ransacking villages for fun, Luffy’s reason for being a pirate is one of pure wonder: the thought of an exciting adventure that leads him to intriguing people and ultimately, the promised treasure. Following in the footsteps of his childhood hero, Luffy and his crew travel across the Grand Line, experiencing crazy adventures, unveiling dark mysteries and battling strong enemies, all in order to reach the most coveted of all fortunes—One Piece.\n[Written by MAL Rewrite]",
      canonicalTitle: "One Piece",
      startDate: "1999-10-20",
      endDate: null,
      nextRelease: "2021-08-15T09:30:00.000+09:00",
      subtype: "TV",
      status: "current",
      posterImage: {small: "https://media.kitsu.io/anime/poster_images/12/small.jpg?1597699104"},
      coverImage: { large: "https://media.kitsu.io/anime/cover_images/12/large.jpg?1597701689"}
    },
    {
      synopsis: "It is the Taisho Period in Japan. Tanjiro, a kindhearted boy who sells charcoal for a living, finds his family slaughtered by a demon. To make matters worse, his younger sister Nezuko, the sole survivor, has been transformed into a demon herself. Though devastated by this grim reality, Tanjiro resolves to become a “demon slayer” so that he can turn his sister back into a human, and kill the demon that massacred his family.\n\n(Source: Crunchyroll)",
      canonicalTitle: "Kimetsu no Yaiba",
      startDate: "2019-04-06",
      endDate: "2019-09-28",
      nextRelease: null,
      subtype: "TV",
      status: "finished",
      posterImage: {small: "https://media.kitsu.io/anime/poster_images/41370/small.jpg?1597699092"},
      coverImage: { large: "https://media.kitsu.io/anime/cover_images/41370/large.jpg?1597701689"}
    },
    {
      synopsis: "Hunter x Hunter is set in a world where Hunters exist to perform all manner of dangerous tasks like capturing criminals and bravely searching for lost treasures in uncharted territories. Twelve-year-old Gon Freecss is determined to become the best Hunter possible in hopes of finding his father, who was a Hunter himself and had long ago abandoned his young son. However, Gon soon realizes the path to achieving his goals is far more challenging than he could have ever imagined.\n\nAlong the way to becoming an official Hunter, Gon befriends the lively doctor-in-training Leorio, vengeful Kurapika, and rebellious ex-assassin Killua. To attain their own goals and desires, together the four of them take the Hunter Exam, notorious for its low success rate and high probability of death. Throughout their journey, Gon and his friends embark on an adventure that puts them through many hardships and struggles. They will meet a plethora of monsters, creatures, and characters—all while learning what being a Hunter truly means.\n\n(Source: MAL Rewrite)",
      canonicalTitle: "Hunter x Hunter (2011)",
      startDate: "2011-10-02",
      endDate: "2014-09-24",
      nextRelease: null,
      subtype: "TV",
      status: "finished",
      posterImage: {small: "https://media.kitsu.io/anime/poster_images/6448/small.jpg?1597696571"},
      coverImage: { large: "https://media.kitsu.io/anime/cover_images/6448/large.jpg?1597702064"}
    },
    {
      synopsis: "Centuries ago, mankind was slaughtered to near extinction by monstrous humanoid creatures called titans, forcing humans to hide in fear behind enormous concentric walls. What makes these giants truly terrifying is that their taste for human flesh is not born out of hunger but what appears to be out of pleasure. To ensure their survival, the remnants of humanity began living within defensive barriers, resulting in one hundred years without a single titan encounter. However, that fragile calm is soon shattered when a colossal titan manages to breach the supposedly impregnable outer wall, reigniting the fight for survival against the man-eating abominations.\n\nAfter witnessing a horrific personal loss at the hands of the invading creatures, Eren Yeager dedicates his life to their eradication by enlisting into the Survey Corps, an elite military unit that combats the merciless humanoids outside the protection of the walls. Based on Hajime Isayama's award-winning manga, Shingeki no Kyojin follows Eren, along with his adopted sister Mikasa Ackerman and his childhood friend Armin Arlert, as they join the brutal war against the titans and race to discover a way of defeating them before the last walls are breached.\n\n(Source: MAL Rewrite)",
      canonicalTitle: "Attack on Titan",
      startDate: "2013-04-07",
      endDate: "2013-09-29",
      nextRelease: null,
      subtype: "TV",
      status: "finished",
      posterImage: {small: "https://media.kitsu.io/anime/poster_images/7442/small.jpg?1597698856"},
      coverImage: { large: "https://media.kitsu.io/anime/cover_images/7442/large.jpg?1597701549"}
    },
    {
      synopsis: "Third season of Boku no Hero Academia.",
      canonicalTitle: "Boku no Hero Academia 3",
      startDate: "2018-04-07",
      endDate: "2018-09-29",
      nextRelease: null,
      subtype: "TV",
      status: "finished",
      posterImage: {small: "https://media.kitsu.io/anime/poster_images/13881/small.jpg?1597698784"},
      coverImage: { large: "https://media.kitsu.io/anime/cover_images/13881/large.jpg?1597701465"}
    }
]
  // generel collection of animes that acts as db 
  const [animes, setAnimes] = useState<IAnime[]>(initialAnimeState)
  // this collection is used to know what anime to show when user press animecard
  const [anime, setAnime] = useState<IAnime>({
    synopsis: "It has been two and a half years since Naruto Uzumaki left Konohagakure, the Hidden Leaf Village, for intense training following events which fueled his desire to be stronger. Now Akatsuki, the mysterious organization of elite rogue ninja, is closing in on their grand plan which may threaten the safety of the entire shinobi world.\n\nAlthough Naruto is older and sinister events loom on the horizon, he has changed little in personality—still rambunctious and childish—though he is now far more confident and possesses an even greater determination to protect his friends and home. Come whatever may, Naruto will carry on with the fight for what is important to him, even at the expense of his own body, in the continuation of the saga about the boy who wishes to become Hokage.\n\n(Source: MAL Rewrite)",
    canonicalTitle: "Naruto: Shippuuden",
    startDate: "2007-02-15",
    endDate: "2017-03-23",
    nextRelease: null,
    subtype: "TV",
    status: "finished",
    posterImage: {small: "https://media.kitsu.io/anime/poster_images/1555/small.jpg?1597696875"},
    coverImage: { large: "https://media.kitsu.io/anime/cover_images/1555/large.jpg?1597702491"}
  })
  const [users, setUsers] = useState<Users["users"]>([
    {
      email: "test@gmail.com",
      username: "test",
      password: "1234"
    }
  ])
  
  return (
    <Router>
      <div className="App">
        <Switch>
          <Route path='/Signup'>
            <Header/>
            <Signup users={users} setUsers={setUsers}/>
          </Route>
          <Route path='/Login'>
            <Header/>
            <Login users={users}/>
          </Route>
          <Route path='/Animeinfo'>
            <Header />
            <Animeinfo anime={anime}/>
            </Route>
          <Route path='/'>
            <Header />
            <SearchBar initialAnimeState={initialAnimeState} animes={animes} setAnimes={setAnimes}/>
            <Animecards Animes={animes} setAnime={setAnime}/>
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
