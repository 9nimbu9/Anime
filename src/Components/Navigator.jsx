import React , { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Axios from "axios"
import SearchLink from "./SearchLink";
import Spinner from 'react-bootstrap/Spinner';

function Navigator(){
    const [name, setName] = useState("")
    const [data,setData] = useState([])
    const navigate = useNavigate()
    const [isLoading, setLoading] = useState(false)

    function api(){
        setLoading(true)
        Axios.get("https://api.jikan.moe/v4/anime?letter="+name).then(
        (respond) => {
            setData(respond.data.data)
            setLoading(false)
        })
    }
    

    function type(event){
        setName(event.target.value)
        if(name.length!==0){
            api()
        }
    }

    function click(event){
        // const filters = data.filter(f => f.titles[0].title === name)
        // setFil(filters)
        if(name!==""){
            navigate("/search/"+name,{
                state:{
                    Name: name,
                }
            })
            setName("")
            event.preventDefault()   
        }
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
                            <input value={name} onChange={type} name="search" type="text" placeholder="Search anime..." autoComplete="off"/>
                        </Nav>
                        <Link className="link h" style={{fontSize: "100%", padding:"0", marginLeft: "0"}}
                            to={"/search/"+name}
                            state={{
                                Name: name
                            }}>
                            <button className="button" onClick={click}>Search</button>
                        </Link>     
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
            {/* <div className="recommend">
                {!isLoading?data.map(m => <SearchLink key={m.mal_id} source={m.trailer.embed_url} 
                season={m.season} background={m.background} rating={m.rating} status={m.status} 
                type={m.type} episodes={m.episodes} year={m.aired.prop.from.year} id={m.mal_id} 
                synopsis={m.synopsis} name={m.title} image={m.images.jpg.image_url} duration={m.duration}/>):
                <div>
                    <Spinner animation="grow" variant="secondary" size="sm"/>
                    <span>      </span>
                    <Spinner animation="grow" variant="secondary" size="sm"/>
                    <span>      </span>
                    <Spinner animation="grow" variant="secondary" size="sm"/>
                </div>}
            </div> */}
        </div>       
    )
}

export default Navigator