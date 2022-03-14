import { useState, useEffect } from "react";
import { Card, button } from 'react-bootstrap';
import { Link } from "react-router-dom";

const Home = () =>{
    return(
        <div className="Home">
            <h1>In Home</h1>
            <Link to="/login">
                <button>log in</button>
            </Link>
        </div>
    )
}

export default Home;