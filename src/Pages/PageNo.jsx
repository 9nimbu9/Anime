import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Link, useNavigate } from "react-router-dom";
import Card from "../Components/Card";
import Pagination from "../Components/Pagination";
import Axios from "axios";
import Loading from "../Components/Loading";
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

function PageNo(){
    const [data, setData] = useState([])
    const [name, setName] = useState("")
    const [totalpages, setTotalpages] = useState([])
    const navigate = useNavigate()
    const {pno} = useParams()
    console.log(pno)

    function api(){
        Axios.get("https://api.jikan.moe/v4/top/anime?page="+pno).then(
        (respond) => {
            setData(respond.data.data)
            for(let i=1;i<=respond.data.pagination.last_visible_page/10;i++){
                let obj = {
                    page: i
                }
                setTotalpages(totalpages => [...totalpages, obj])
            }
        })
    }
    useEffect(() => {
        api()
    },[useParams()])
    
    function type(event){
        setName(event.target.value)
    }

    function click(event){
        if(name!==""){
            navigate("/search",{
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
            {data.length!==0?data.map(m => <Card key={m.mal_id} source={m.trailer.embed_url} season={m.season} background={m.background} rating={m.rating} status={m.status} type={m.type} 
            episodes={m.episodes} year={m.aired.prop.from.year} id={m.mal_id} synopsis={m.synopsis} name={m.title} 
            image={m.images.jpg.image_url}/>):<Loading/>}
            </div>
            <h5>{pno}</h5>
            <div className="area">
                {totalpages.map(m => <Pagination page={m.page}/>)}
            </div>
        </div>
    )
}

export default PageNo