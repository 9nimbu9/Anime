import React, { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import { Link, useNavigate } from "react-router-dom";
import Card from "../Components/Card";
import Axios from "axios";
import Loading from "../Components/Loading";
import PaginationSearch from "../Components/PaginationSearch";
import Navigator from "../Components/Navigator"
let count1=0
let count2=5

function PageNo(){ 
    const location = useLocation()
    const [data, setData] = useState([])
    const [name, setName] = useState(location.state.Names)
    const [totalpages, setTotalpages] = useState([])
    const [lastPage, setLastpage] = useState()
    const navigate = useNavigate()
    const {pnoSearch} = useParams()
    const [isLoading, setLoading] = useState(false)
    const [f, setF] = useState(count1)
    const [s, setS] = useState(count2)
    let nextPage = Number(pnoSearch)+1
    let prevPage = Number(pnoSearch)-1
    const [n, setN] = useState(1)
    console.log(pnoSearch)
 
    function api(){
        setLoading(true)
        Axios.get("https://api.jikan.moe/v4/anime?letter="+name+"&page="+pnoSearch).then(
        (respond) => {
            setData(respond.data.data)
            setLoading(false)
            setLastpage(respond.data.pagination.last_visible_page)
            if(n==1){
                for(let i=1;i<=respond.data.pagination.last_visible_page;i++){
                    let obj = {
                        page: i
                    }
                    setTotalpages(totalpages => [...totalpages, obj])
                }
            }
        })
    }
    useEffect(() => {
        api()
        setN(2)
    },[useParams()])
    
    function next(){
        if(pnoSearch>=1 && pnoSearch<=10){
            nextPage=Number(pnoSearch)+1
        }
        else{
            setF(count1++)
            setS(count2++)
        }
        navigate("/Search_pageNo/"+nextPage,{
            state:{
                Names: location.state.names
            }
        })
    }

    function previous(){
        if(pnoSearch>=1 && pnoSearch<=10){
            prevPage=Number(pnoSearch)-1
        }
        else{
            setF(--count1)
            setS(--count2)
        }
        navigate("/Search_pageNo/"+prevPage,{
            state:{
                Names: location.state.names
            }
        })
    }

    function lastP(){
        navigate("/Search_pageNo/"+lastPage)
    }
    
    return(
        <div>
            <Navigator/>
            <div className="area">
                {!isLoading?data.map(m => <Card key={m.mal_id} source={m.trailer.embed_url} season={m.season} background={m.background} rating={m.rating} status={m.status} type={m.type} 
                episodes={m.episodes} year={m.aired.prop.from.year} id={m.mal_id} synopsis={m.synopsis} name={m.title} 
                image={m.images.jpg.image_url}/>):<Loading/>}
            </div>
            <h5>{pnoSearch}</h5>
            <div>
                <button onClick={previous}>Previous</button>{!isLoading?totalpages.slice(f,s).map(m => <PaginationSearch page={m.page}/>):""}<button onClick={next}>Next</button>
            </div>
        </div>
    )
}

export default PageNo