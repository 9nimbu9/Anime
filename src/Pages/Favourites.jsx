import React, { useEffect, useState } from "react";
import Card from "../Components/Card";
import { useLocation } from "react-router-dom";
import Navigator from "../Components/Navigator";

function Favourites(){
    const location = useLocation()
    const [name, setName] = useState(location.state.Name)

    function store(){}

    useEffect(() => {
        setName(JSON.stringify(name => [...name, window.localStorage.getItem('name')]))
    })
    useEffect(() => {
        window.localStorage.setItem('name', name);
    }, [name])
    // const [count, setCount] = useState(0);

    // useEffect(() => {
    //     setCount(JSON.parse(window.localStorage.getItem('count')));
    // }, []);

    // useEffect(() => {
    //     window.localStorage.setItem('count', count);
    // }, [count]);

    // const increaseCount = () => {
    //     return setCount(count + 1);
    // }
    // const decreaseCount = () => {
    //     return setCount(count - 1)
    // }

    return (
        // <div className="App">
        // <h1> Count {count} </h1>
        // <button onClick={increaseCount}>+</button>
        // <button onClick={decreaseCount}>-</button>
        // </div>
        <div>
            <Navigator/>
            <Card name={name} image={location.state.Image}/>
        </div>
    );
}

export default Favourites