import React, { useState, useEffect } from "react";
import Axios from "axios"
import Card from "./Card";
import Loading from "./Loading";
import Genre from "./Genre";
import Navigator from "./Navigator";
import Spinner from 'react-bootstrap/Spinner';

function Store(){
    const [data1, setData1] = useState([])
    const [data2, setData2] = useState([])
    const [data3, setData3] = useState([])
    const [data4, setData4] = useState([])
    const [data5, setData5] = useState([])
    const [isLoading, setLoading] = useState(false)

    function api1(){
        setLoading(true)
        Axios.get("https://api.jikan.moe/v4/top/anime?filter=bypopularity&limit=5").then(
        (respond) => {
            setData1(respond.data.data)
            setLoading(false)
        })
    } 

    function api2(){
        setLoading(true)
        Axios.get("https://api.jikan.moe/v4/top/anime?limit=5").then(
        (respond) => {
            setData2(respond.data.data)
            setLoading(false)
        })
    }

    function api3(){
        setLoading(true)
        Axios.get("https://api.jikan.moe/v4/top/anime?filter=airing&limit=5").then(
        (respond) => {
            setData3(respond.data.data)
            setLoading(false)
        })
    }

    function api4(){
        setLoading(true)
        Axios.get("https://api.jikan.moe/v4/top/anime?filter=upcoming&limit=5").then(
        (respond) => {
            setData4(respond.data.data)
            setLoading(false)
        })
    }

    function api5(){
        setLoading(true)
        Axios.get("https://api.jikan.moe/v4/genres/anime").then(
        (respond) => {
            setData5(respond.data.data)
            setLoading(false)
        })  
    }

    useEffect(() => {
        api1()
        api2()
        api3()    
        api4() 
        api5()   
    },[])    

    function click(event){
        event.preventDefault()  
    }

    return(
        <form onSubmit={click}>
            <Navigator/>
            {/* <h4>Genre</h4>
            {data5.map(m => <Genre key={m.mal_id} id={m.mal_id} genre={m.name}/>)} */}
            <a href="/popular"><h1 className="homeTitle">{!isLoading?"Most Popular":""}</h1></a>
            <div className="area">
                {!isLoading?data1.map(m => <Card key={m.mal_id} source={m.trailer.embed_url} season={m.season} background={m.background} rating={m.rating} status={m.status} type={m.type} 
                episodes={m.episodes} year={m.aired.prop.from.year} id={m.mal_id} synopsis={m.synopsis} name={m.title} 
                image={m.images.jpg.image_url} duration={m.duration}/>):<Loading/>}
            </div>
            <a href="/top"><h1 className="homeTitle">{!isLoading?"Top Anime":""}</h1></a>
            <div className="area">
                {!isLoading?data2.map(m => <Card key={m.mal_id} source={m.trailer.embed_url} season={m.season} background={m.background} rating={m.rating} status={m.status} type={m.type} 
                episodes={m.episodes} year={m.aired.prop.from.year} id={m.mal_id} synopsis={m.synopsis} name={m.title} 
                image={m.images.jpg.image_url} duration={m.duration}/>):<Spinner animation="border" role="status"></Spinner>}
            </div>
            <a href="/top_airing"><h1 className="homeTitle">{!isLoading?"Top Airing":""}</h1></a>
            <div className="area"> 
                {!isLoading?data3.map(m => <Card key={m.mal_id} source={m.trailer.embed_url} season={m.season} background={m.background} rating={m.rating} status={m.status} type={m.type} 
                episodes={m.episodes} year={m.aired.prop.from.year} id={m.mal_id} synopsis={m.synopsis} name={m.title} 
                image={m.images.jpg.image_url} duration={m.duration}/>):<Spinner animation="border" role="status"></Spinner>}
            </div>
            <a href="top_upcoming"><h1 className="homeTitle">{!isLoading?"Top Upcoming":""}</h1></a>
            <div className="area">
                {!isLoading?data4.map(m => <Card key={m.mal_id} source={m.trailer.embed_url} season={m.season} background={m.background} rating={m.rating} status={m.status} type={m.type} 
                episodes={m.episodes} year={m.aired.prop.from.year} id={m.mal_id} synopsis={m.synopsis} name={m.title} 
                image={m.images.jpg.image_url} duration={m.duration}/>):<Spinner animation="border" role="status"></Spinner>}
            </div>
        </form>
    )
}

export default Store