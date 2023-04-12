import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Link, useNavigate } from "react-router-dom";
import Axios from "axios";
import Card from "../Components/Card";
import Loading from "../Components/Loading";
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import PaginationSearch from "../Components/PaginationSearch"

let count1=0
let count2=5

function Search(){
    const location = useLocation()
    const navigate = useNavigate()
    const [data, setdata] = useState([])
    const [name, setName] = useState(location.state.Name)
    const [totalpages, setTotalpages] = useState([])
    const [f, setF] = useState(count1)
    const [s, setS] = useState(count2)
    const [pnoSearch] = useState(1)
    const [isloading, setLoading] =useState(false)
    const [prevName, setPrevname] = useState(name)
    let nextPage = pnoSearch+1
    let prevPage = pnoSearch-1

    function api(){
        setLoading(true)
        Axios.get("https://api.jikan.moe/v4/anime?letter="+name).then(
        (respond) => {
            setdata(respond.data.data)
            setLoading(false)
            for(let i=1;i<=respond.data.pagination.last_visible_page;i++){
                let obj = {
                    page: i,
                    names: name
                }
                setTotalpages(totalpages => [...totalpages, obj])
            }
            setName("")
        })
    }
    useEffect(() => {
        api()
    },[]) 
    
    function type(event){
        setName(event.target.value)
    }

    function click(){
        if(name!==""){
            api()
            navigate("/search/"+name,{
                state:{
                    Name: name,
                }
            })
        }
        setTotalpages([])
        setPrevname(name)
        setName("")
    }

    function next(){
        if(pnoSearch>=1 && pnoSearch<=5){
            nextPage=Number(pnoSearch)+1
        }
        else{
            setF(count1++)
            setS(count2++)
        }
        navigate("/Search_pageNo/"+nextPage,{
            state:{
                Names: prevName
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
                Names: prevName
            }
        })
    }

    return(
        <div>
            <Navbar style={{padding:"0.5%"}} collapseOnSelect expand="lg" className="heading">
                <Navbar.Brand href="/"><img className="title" src="https://cdn-icons-png.flaticon.com/512/5611/5611024.png"/></Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" className="toggle"/>
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav style={{margin: "auto"}}>
                        <Nav.Link className="h" href="/"><h1 className="h">Home</h1></Nav.Link>
                        <Nav.Link className="h" href="/movies"><h1 className="h">Movies</h1></Nav.Link>
                        <Nav.Link className="h" href="/ona"><h1 className="h">ONA</h1></Nav.Link>
                        <Nav.Link className="h" href="/ova"><h1 className="h">OVA</h1></Nav.Link>
                        <Nav.Link className="h" href="/special"><h1 className="h">Special</h1></Nav.Link>  
                        <Nav className="h" style={{display: "inline-block", paddingRight:"0", marginRight: "0"}}>
                            <input value={name} onChange={type} name="search" type="text" placeholder="Search anime..."/>
                        </Nav>
                        <Link className="link h" style={{fontSize: "100%", padding:"0", marginLeft:"0"}}
                            to={"/search/"+name}
                            state={{
                                Name: name
                            }}>
                        <button className="button" onClick={click}>Search</button></Link>     
                    </Nav>
                </Navbar.Collapse>
            </Navbar>     
            <div className="area">
                {!isloading?data.map(m => <Card season={m.season} source={m.trailer.embed_url} background={m.background} key={m.mal_id} id={m.mal_id} rating={m.rating} status={m.status} type={m.type} episodes={m.episodes} year={m.aired.prop.from.year} synopsis={m.synopsis} name={m.title} image={m.images.jpg.image_url}/>):
                <Loading/>}
            </div> 
            <div>
                <button onClick={previous}>Previous</button>{!isloading?totalpages.slice(f,s).map(m => <PaginationSearch key={m.page} names={m.names} page={m.page}/>):""}<button onClick={next}>Next</button>
            </div>
        </div>
    )
}

export default Search