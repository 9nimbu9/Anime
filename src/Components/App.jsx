import React from "react";
import { BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import Home from "../Pages/Home";
import Details from "../Pages/Details";
import Search from "../Pages/Search";
import Movies from "../Pages/Movies";
import Ova from "../Pages/Ova";
import Ona from "../Pages/Ona"
import Special from "../Pages/Special";
import PageNo from "../Pages/PageNo";

function App(){
    return(
        <Router>
            <Routes>
                <Route path="/" element={<Home/>}/>
                <Route path="/detail" element={<Details/>}/>   
                <Route path="/search" element={<Search/>}/>
                <Route path="/movies" element={<Movies/>}/>
                <Route path="/ova" element={<Ova/>}/>
                <Route path="/ona" element={<Ona/>}/>
                <Route path="/special" element={<Special/>}/>
                <Route path="/pageNo/:pno" element={<PageNo/>}/>
            </Routes>
        </Router>
    )
}

export default App