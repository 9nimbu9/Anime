import React, { useState } from "react";

function Streaming(props){
    var img=""
    var alt=""

    if(props.name==="Crunchyroll"){
        alt=props.name
        img="https://cdn.iconscout.com/icon/free/png-256/crunchyroll-4062809-3357695.png"        
    }
    if(props.name==="Funimation"){
        alt=props.name
        img="https://assets.stickpng.com/images/6133736e82b156000425b3b5.png"
    }
    if(props.name==="Netflix"){
        alt=props.name
        img="https://s3.amazonaws.com/ionic-marketplace/ionic-4-netflix-style-video-streaming/icon.png"        
    }
    if(props.name==="Tubi TV"){
        alt=props.name
        img="https://play-lh.googleusercontent.com/Xy8NOV0EXdrbji891ShNk9HKqYWtC0__mQDrSA_SNlqcg-a0OarjX1Ny3kIxxYPoZkc"
    }
    else{
        alt=props.name
    }

    return(
        <div className="genreName" style={{border: "none"}}>
            <a href={props.url} target="_blank"><img className="streaming" style={{width: "50px", height: "50px"}} src={img} alt={alt}/></a>
        </div>
    )
}

export default Streaming