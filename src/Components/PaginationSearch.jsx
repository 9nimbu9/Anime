import React from "react";
import { Link, useNavigate } from "react-router-dom";

function PaginationSearch(props){
    const navigate = useNavigate()
    const names = props.names
    // console.log(names)

    function pageClick(){
        navigate("/Search_pageNo/"+props.page,{
            state:{
                Names: names
            } 
        })
    }
    
    return( 
        <div className="areas">
            <Link
                to={"/Search_pageNo/"+props.page}
                state={{
                    Names: names
                }}>
            <button className="pageButton" style={{width: "50px"}} onClick={pageClick}>{props.page}</button></Link>
        </div>
    )
}

export default PaginationSearch