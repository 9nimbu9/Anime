import React from "react";
import { BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import Home from "../Pages/Home";
import Details from "../Pages/Details";
import Search from "../Pages/Search";
import Movies from "../Pages/Movies";
import Ova from "../Pages/Ova";
import Ona from "../Pages/Ona"
import Special from "../Pages/Special";
import Top_PageNo from "../Pages/Top_PageNo";
import Popularity from "../Pages/Popularity";
import Top from "../Pages/Top";
import Airing from "../Pages/Airing";
import Upcoming from "../Pages/Upcoming";
import PageNoSearch from "../Pages/PageNoSearch"
import GenreAnime from "../Pages/GenreAnime";
import GenrePageNo from "../Pages/GenrePageNo";
import Favourites from "../Pages/Favourites"

function App(){
    return( 
        <Router>
            <Routes>
                <Route path="/" element={<Home/>}/>
                <Route path="/:name" element={<Details/>}/>   
                <Route path="/search/:n" element={<Search/>}/>
                <Route path="/movies" element={<Movies/>}/>
                <Route path="/ova" element={<Ova/>}/>
                <Route path="/ona" element={<Ona/>}/> 
                <Route path="/special" element={<Special/>}/>
                <Route path="/pageNo/:pno" element={<Top_PageNo/>}/>
                <Route path="/popular" element={<Popularity/>}/>
                <Route path="/top" element={<Top/>}/>
                <Route path="/top_airing" element={<Airing/>}/>
                <Route path="/top_upcoming" element={<Upcoming/>}/>
                <Route path="/Search_pageNo/:pnoSearch" element={<PageNoSearch/>}/>
                <Route path="/genres_:gn/:g" element={<GenreAnime/>}/>
                <Route path="/genre_pageNo/:gpno" element={<GenrePageNo/>}/>
                <Route path="/favourites" element={<Favourites/>}/>
            </Routes>
        </Router>
    )
}

export default App