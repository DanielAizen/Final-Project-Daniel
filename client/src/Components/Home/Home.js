import { useState, useEffect } from "react";
import { Card, Button } from 'react-bootstrap';
//import Button from 'react-bootstrap/Button';
import { Link } from "react-router-dom";

import './Home.css'

const Home = () =>{
    return(
        <div className="Home">
            <Link to="/login">
                <div className="main-div">
                    <Button variant="outline-primary" size="lg">log in</Button>
                </div>
            </Link>
            <h1>In Home</h1>
        </div>
    )
}

export default Home;