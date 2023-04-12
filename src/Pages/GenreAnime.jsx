import React, { useEffect, useState } from "react";
import Card from "../Components/Card";
import { useLocation, useParams } from "react-router-dom";
import { Link, useNavigate } from "react-router-dom";
import Axios from "axios"
import Loading from "../Components/Loading";    
import GenrePagination from "../Components/GenrePagination";
import Navigator from "../Components/Navigator"
let count1=0
let count2=5

function GenreAnime(){
    const location = useLocation()
    const [data, setData] = useState([])
    const [totalpages, setTotalpages] = useState([])
    const navigate = useNavigate()
    const [isLoading, setLoading] = useState(false)
    const {g} = useParams()
    const [f, setF] = useState(count1)
    const [s, setS] = useState(count2)
    const [gpno] = useState(1)
    let nextPage = gpno+1
    let prevPage = gpno-1

    function api(){
        setLoading(true)
        Axios.get("https://api.jikan.moe/v4/anime?genres="+g).then(
            (respond) => {
                setData(respond.data.data)
                setLoading(false)
                for(let i=1;i<=respond.data.pagination.last_visible_page; i++){
                    let obj ={
                        page: i,
                        ids: location.state.Id
                    }
                    setTotalpages(totalpages => [...totalpages, obj])
                }
            }
        )
    }
    useEffect(() => {
        api()
    },[])

    function next(){
        console.log(g)
        navigate("/genre_pageNo/"+nextPage,{
            state:{
                IDs: g
            }
        })   
        setF(++count1)
        setS(++count2)              
    }
    function prev(){
        if(gpno>=1 && gpno<=10){
            prevPage=Number(gpno)-1
        }
        else{
            setF(--count1)
            setS(--count2)
        }
        navigate("/genre_pageNo/"+prevPage,{
            state:{
                IDs: g
            }
        })                    
    }

    return(
        <div>
            <Navigator/>
            <h1 className="homeTitle">{location.state.Genre}</h1>
            <div className="area">
                {!isLoading?data.map(m => <Card key={m.mal_id} source={m.trailer.embed_url} season={m.season} background={m.background} rating={m.rating} status={m.status} type={m.type} 
                episodes={m.episodes} year={m.aired.prop.from.year} id={m.mal_id} synopsis={m.synopsis} name={m.title} 
                image={m.images.jpg.image_url} duration={m.duration}/>):<Loading/>}
            </div>
            1
            <div>
                <button onClick={prev}>Previous</button>{totalpages.slice(f,s).map(m => <GenrePagination ids={m.ids} name={location.state.Genre} key={m.page} page={m.page}/>)}<button onClick={next}>Next</button>
            </div>
        </div>
    ) 
}

export default GenreAnime