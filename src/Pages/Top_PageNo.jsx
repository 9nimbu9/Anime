import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Link, useNavigate } from "react-router-dom";
import Card from "../Components/Card";
import Top_Pagination from "../Components/Top_Pagination";
import Axios from "axios";
import Loading from "../Components/Loading";
import { useLocation } from "react-router-dom";
import Navigator from "../Components/Navigator"
let count1=0
let count2=5
 
function PageNo(){
    const location = useLocation()
    const [data, setData] = useState([])
    const [totalpages, setTotalpages] = useState([])
    const [lastPage, setLastpage] = useState()
    const navigate = useNavigate()
    const {pno} = useParams()
    const [isLoading, setLoading] = useState(false)
    const [f, setF] = useState(count1)
    const [s, setS] = useState(count2)
    let nextPage = Number(pno)+1
    let prevPage = Number(pno)-1
    const [n, setN] = useState(1)
    const [count, setCount] = useState()
    
    function api(){
        console.log(location.state.Url)
        setLoading(true) 
        Axios.get("https://api.jikan.moe/v4/top/anime?"+location.state.Url+"&page="+pno).then(
        (respond) => {
            setData(respond.data.data)
            setLoading(false)
            setLastpage(respond.data.pagination.last_visible_page)
            if(n===1){
                for(let i=1;i<=respond.data.pagination.last_visible_page;i++){
                    let obj = {
                        page: i,
                        url: location.state.Url
                    }
                    setCount(i)
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
        navigate("/pageNo/"+nextPage,{
            state:{
                Url: location.state.Url
            }
        })
        setF(++count1)
        setS(++count2)
    }

    function previous(){
        if(pno>=1 && pno<=5){
            prevPage=Number(pno)-1
        }
        else{
            setF(--count1)
            setS(--count2)
        }
        navigate("/pageNo/"+prevPage,{
            state:{
                Url: location.state.Url
            }
        })
    }

    function lastP(){
        navigate("/pageNo/"+lastPage)
    }
    
    return(
        <div>
            <Navigator/>
            <div className="area">
                {!isLoading?data.map(m => <Card key={m.mal_id} source={m.trailer.embed_url} season={m.season} background={m.background} rating={m.rating} status={m.status} type={m.type} 
                episodes={m.episodes} year={m.aired.prop.from.year} id={m.mal_id} synopsis={m.synopsis} name={m.title} 
                image={m.images.jpg.image_url}/>):<Loading/>}
            </div>
            <h5>{pno}</h5>
            <div>
                <button onClick={previous}>Previous</button>{!isLoading?totalpages.slice(f,s).map(m => <Top_Pagination url={m.url} key={m.page} page={m.page} count={count}/>):""}<button onClick={next}>Next</button>
            </div>
        </div>
    )
}

export default PageNo