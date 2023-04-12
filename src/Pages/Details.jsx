import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import Axios from "axios";
import Genre from "../Components/Genre";
import Streaming from "../Components/Streaming"
import Navigator from "../Components/Navigator";
import { Link, useNavigate } from "react-router-dom";

function Details(){
    const location = useLocation()
    const navigate = useNavigate()

    const [data1, setData1] = useState([])
    const [data2, setData2] = useState([])
    const [data3, setData3] = useState([])
    const [data4, setData4] = useState([])
    
    if (location.state.Year===null){
        location.state.Year="?"
    }
    if (location.state.Type===null){
        location.state.Type="?"
    }
    if (location.state.Status===null){
        location.state.Status="?"
    }
    if (location.state.Episodes===null){
        location.state.Episodes="?"
    }
    if (location.state.Synopsis===null){
        location.state.Synopsis="?"
    }
    if (location.state.Season===null){
        location.state.Season="?"
    }
    if (location.state.Background===null){
        location.state.Background="?"
    }
    
    function api1(){
        Axios.get("https://api.jikan.moe/v4/anime/"+location.state.Id+"/streaming").then(
            (respond) => {
                setData1(respond.data.data)
        })
    }
    function api2(){
        Axios.get("https://api.jikan.moe/v4/anime/"+location.state.Id).then(
            (respond) => {
                setData2(respond.data.data.genres)
                setData3(respond.data.data.producers)
                setData4(respond.data.data.studios)
        })
    }

    // function favouriteClick(){
    //     navigate("/favourites",{
    //         state: {
    //             Id: location.state.Id,
    //             Name: location.state.Name,
    //             Image: location.state.Image,
    //             Synopsis: location.state.Synopsis,
    //             Year: location.state.Year,
    //             Episodes: location.state.Episodes,
    //             Type: location.state.Type,
    //             Status: location.state.Status,
    //             Rating: location.state.Rating,
    //             Background: location.state.Background,
    //             Season: location.state.Season,
    //             Source: location.state.Source,
    //             Duration: location.state.Duration
    //         }
    //     })
    // }

    useEffect(() => {
        api1()
        api2()
    },[])    
    
    return(
        <div>
            <Navigator/>
            <div className="row">
                <div className="col-lg-2 col1">
                    <img className="detailImg" src={location.state.Image}/>
                    <Link
                        to={"/favourites"}
                        state={{
                            Id: location.state.Id,
                            Name: location.state.Name,
                            Image: location.state.Image,
                            Synopsis: location.state.Synopsis,
                            Year: location.state.Year,
                            Episodes: location.state.Episodes,
                            Type: location.state.Type,
                            Status: location.state.Status,
                            Rating: location.state.Rating,
                            Background: location.state.Background,
                            Season: location.state.Season,
                            Source: location.state.Source,
                            Duration: location.state.Duration
                        }}><button>Favourites</button>
                    </Link>
                </div>
                <div className="col-lg-7">
                    <h3>{location.state.Name}</h3>
                    <br></br>
                    <b className="detailMain">Synopsis</b>
                    <p>{location.state.Synopsis}</p>
                    <br></br>
                    <b className="detailMain">Background</b>
                    <p>{location.state.Background}</p>
                    <br></br>
                    <b className="detailMain">Trailer</b>
                    <br></br>
                    <iframe width="92%" height="360" src={location.state.Source} frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; 
                    picture-in-picture" allowFullScreen/>
                    <br></br><br></br>
                    <b className="detailMain">Watch</b>
                    <br></br>
                    {data1.map(m => <Streaming key={m.mal_id} className="watch" name={m.name} url={m.url}/>)}
                </div>
                <div className="col-lg-3 col2nd">
                    <p><b className="detailSide">Year:</b> {location.state.Year}</p>
                    <p><b className="detailSide">Type:</b> {location.state.Type}</p>
                    <p><b className="detailSide">Episodes:</b> {location.state.Episodes}</p>
                    <p><b className="detailSide">Duration:</b> {location.state.Duration}</p>
                    <p><b className="detailSide">Status:</b> {location.state.Status}</p>
                    <p><b className="detailSide">Rating:</b> {location.state.Rating}</p>
                    <p><b className="detailSide">Season:</b> {location.state.Season}</p>                    
                    <p><b className="detailSide">Genre:</b>
                        {data2.map(m => <Genre key={m.mal_id} id={m.mal_id} genre={m.name}/>)}
                    </p>
                    <p><b className="detailSide">Producers: </b> 
                        {data3.map(m => <span key={m.mal_id}>{m.name}, </span>)}
                    </p>                    
                    <p><b className="detailSide">Studios: </b> 
                        {data4.map(m => <span key={m.mal_id}>{m.name} </span>)}
                    </p>                    
                </div>
            </div>
        </div>
    )
}

export default Details