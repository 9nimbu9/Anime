import React, { useState, useEffect } from "react";
import Axios from "axios"
import Card from "./Card";
import { Link, useNavigate } from "react-router-dom";
import Loading from "./Loading";
import Top_Pagination from "./Top_Pagination";
import Navigator from "./Navigator"

let count1=0
let count2=5

function Store2(props){ 
    const [data, setData] = useState([])
    const [totalpages, setTotalpages] = useState([])
    const navigate = useNavigate()
    const [isLoading, setLoading] = useState(false)
    const [f, setF] = useState(count1)
    const [s, setS] = useState(count2)
    const [pno] = useState(1) 
    let nextPage = pno+1
    let prevPage = pno-1
    const [n, setN] = useState(1)

    function api(){
        setLoading(true)
        Axios.get("https://api.jikan.moe/v4/top/anime?"+props.url).then(
        (respond) => {
            setData(respond.data.data)
            setLoading(false)
            if(n==1){
                for(let i=1;i<=respond.data.pagination.last_visible_page;i++){
                    let obj = {
                        page: i,
                        url: props.url
                    }
                    setTotalpages(totalpages => [...totalpages, obj])
                }
            }
        })
    }

    useEffect(() => {
        api()   
        setN(2) 
    },[])    
    

    function click(event){
        event.preventDefault()   
    }

    function next(){
        navigate("/pageNo/"+nextPage,{
            state:{
                Url: props.url
            }
        })
        setF(++count1)
        setS(++count2)
    }

    function previous(){
        if(pno>=1 && pno<=10){
            prevPage=pno-1
        }
        else{
            setF(--count1)
            setS(--count2)
        }
        navigate("/pageNo/"+prevPage,{
            state:{
                Url: props.url
            }
        })
    }
    
    return(
        <form onSubmit={click}>
            <Navigator/>
            <div className="area">
                {!isLoading?data.map(m => <Card key={m.mal_id} source={m.trailer.embed_url} season={m.season} background={m.background} rating={m.rating} status={m.status} type={m.type} 
                episodes={m.episodes} year={m.aired.prop.from.year} id={m.mal_id} synopsis={m.synopsis} name={m.title} 
                image={m.images.jpg.image_url} duration={m.duration}/>):<Loading/>}
            </div>
            <div>
                <button onClick={previous}>Previous</button>{!isLoading?totalpages.slice(f,s).map(m => <Top_Pagination url={m.url} key={m.page} page={m.page}/>):""}<button onClick={next}>Next</button>
            </div>
        </form>
    ) 
}

export default Store2