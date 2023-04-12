import React from "react";
import { Link, useNavigate } from "react-router-dom";

function Top_Pagination(props){
    const navigate = useNavigate()

    function pageClick(){
        navigate("/pageNo/"+props.page,{
            state:{
                Url: props.url
            }
        })
    } 
    
    return(
        <div className="areas">
            <Link
                to={"/pageNo/"+props.page}
                state={{
                    Url: props.url
                }}>
                <button className="pageButton" style={{width: "50px"}} onClick={pageClick}>{props.page}</button>
            </Link>
        </div>
    )
}

export default Top_Pagination