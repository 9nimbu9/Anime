import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Axios from "axios";

function Pagination(props){
    const navigate = useNavigate()

    function pageClick(){
        navigate("/pageNo/"+props.page)
    }
    
    return(
        <div className="areas">
            <Link
            to={"/pageNo/"+props.page}>
            <button className="button" style={{width: "50px"}} onClick={pageClick}>{props.page}</button></Link>
        </div>
    )
}

export default Pagination