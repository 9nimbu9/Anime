import React from "react";
import { Link, useNavigate } from "react-router-dom";

function Card(props){
    const navigate = useNavigate()

    function click(){
        navigate("/"+props.name,{
            state: {
                Id: props.id,
                Name: props.name,
                Image: props.image,
                Synopsis: props.synopsis,
                Year: props.year,
                Episodes: props.episodes,
                Type: props.type,
                Status: props.status,
                Rating: props.rating,
                Background: props.background,
                Season: props.season,
                Source: props.source,
                Duration: props.duration
            }
        })
    }
    return(
        <div className="cards"> 
            <Link
                to={"/"+props.name}
                state={{
                    Id: props.id,
                    Name: props.name,
                    Image: props.image,
                    Synopsis: props.synopsis,
                    Year: props.year,
                    Episodes: props.episodes,
                    Type: props.type,
                    Status: props.status,
                    Rating: props.rating,
                    Background: props.background,
                    Season: props.season,
                    Source: props.source,
                    Duration: props.duration
                }}>
            <img className="aImage" src={props.image}/>
            <h6 className="cardName" onClick={click}>{props.name}</h6></Link> 
        </div>
    )
}

export default Card