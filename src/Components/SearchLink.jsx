import React from "react";
import { Link } from "react-router-dom";

function SearchLink(props){
    return(
        <div>
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
                <p>{props.name}</p>      
            </Link>
        </div>
    )

}

export default SearchLink