import React from "react"
import { Link, useNavigate } from "react-router-dom";

function GenrePagination(props){
    const navigate = useNavigate()

    function pageClick(){
        navigate("/genre_pageNo/"+props.page,{
            state:{
                IDs: props.ids,
                Names: props.name
            }
        }) 
    }
    
    return( 
        <div className="areas">
            <Link
                to={"/genre_pageNo/"+props.page}
                state={{
                    IDs: props.ids,
                    Names: props.name
                }}>
            <button className="pageButton" style={{width: "50px"}} onClick={pageClick}>{props.page}</button></Link>
        </div>
    )
}

export default GenrePagination