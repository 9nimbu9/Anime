import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Link, useNavigate } from "react-router-dom";
import Axios from "axios";
import Card from "../Components/Card";
import Loading from "../Components/Loading";
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

function Search(){
    const location = useLocation()
    const navigate = useNavigate()
    const [fil, setFil] = useState([])
    const [name, setName] = useState(location.state.Name)

    function api(){
        Axios.get("https://api.jikan.moe/v4/anime?letter="+name).then(
        (respond) => {
            setFil(respond.data.data)
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
            navigate("/search",{
                state:{
                    Name: name,
                }
            })
        }
        setName("")
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
                            <Nav.Link className="h"><input value={name} onChange={type} name="search" type="text" placeholder="Search anime..."/></Nav.Link>
                            <Nav.Link><Link className="link"
                                to="/search"
                                state={{
                                    Name: name
                                }}>
                            <button className="button" onClick={click}>Search</button></Link>     
                            </Nav.Link>                     
                        </Nav>
                    </Navbar.Collapse>
            </Navbar>     
            <div className="area">
                {fil.length!==0?fil.map(m => <Card season={m.season} source={m.trailer.embed_url} background={m.background} key={m.mal_id} id={m.mal_id} rating={m.rating} status={m.status} type={m.type} episodes={m.episodes} year={m.aired.prop.from.year} synopsis={m.synopsis} name={m.title} image={m.images.jpg.image_url}/>):
                <Loading/>}
            </div> 
        </div>
    )
}

export default Search