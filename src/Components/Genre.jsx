import React from "react"
import { Link, useNavigate } from "react-router-dom";

function Genre(props){
    const navigate = useNavigate()
    
    function click(){
        navigate("/genres_"+props.genre+"/"+props.id,{
            state:{
                Genre: props.genre,
                Id: props.id
            }
        })
    }

    return(
        <Link
            to={"/genres_"+props.genre+"/"+props.id}
            state={{
                Genre: props.genre,
                Id: props.id
            }}>
            <span onClick={click} className="genreName">{props.genre}</span>
        </Link>
    )

}

export default Genre