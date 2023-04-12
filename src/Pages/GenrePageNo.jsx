import React, { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import Axios from "axios"
import Loading from "../Components/Loading";
import Card from "../Components/Card";
import GenrePagination from "../Components/GenrePagination";
import Navigator from "../Components/Navigator";
import { Link, useNavigate } from "react-router-dom";
let count1=0
let count2=5

function GenrePageNo(){
    const location = useLocation()
    const {gpno} = useParams()
    const navigate = useNavigate()
    const [data, setData] = useState([])
    const [isLoading, setLoading] = useState(false)
    const [totalpages, setTotalpages] = useState([])
    const [f, setF] = useState(count1)
    const [s, setS] = useState(count2)
    let nextPage = Number(gpno)+1
    let prevPage = Number(gpno)-1
    const [n, setN] = useState(1)

    function api(){
        setLoading(true)
        Axios.get("https://api.jikan.moe/v4/anime?genres="+location.state.IDs+"&page="+gpno).then(
            (respond) => {
                setData(respond.data.data)
                setLoading(false)
                if(n==1){
                    for(let i=1;i<=respond.data.pagination.last_visible_page; i++){
                        let obj ={
                            page: i,
                            ids: location.state.IDs
                        }
                        setTotalpages(totalpages => [...totalpages, obj])
                    }
                }
            }
        )
    }

    useEffect(() => {
        api()
        setN(2)
    },[useParams()])
    
    function next(){
        console.log(location.state)
        navigate("/genre_pageNo/"+nextPage,{
            state:{
                IDs: location.state.IDs,
                Names: location.state.Names
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
                IDs: location.state.IDs,
                Names: location.state.Names
            }
        })                
    }


    return(
        <div>
            <Navigator/>
            <h1 className="homeTitle">{location.state.Names}</h1>
            <div className="area">
                {!isLoading?data.map(m => <Card key={m.mal_id} source={m.trailer.embed_url} season={m.season} background={m.background} rating={m.rating} status={m.status} type={m.type} 
                episodes={m.episodes} year={m.aired.prop.from.year} id={m.mal_id} synopsis={m.synopsis} name={m.title} 
                image={m.images.jpg.image_url} duration={m.duration}/>):<Loading/>}
            </div>
            {gpno}
            <div>
                <button onClick={prev}>Previous</button>{totalpages.slice(f,s).map(m => <GenrePagination ids={m.ids} key={m.page} page={m.page}/>)}<button onClick={next}>Next</button>
            </div>
        </div>
    )
}

export default GenrePageNo