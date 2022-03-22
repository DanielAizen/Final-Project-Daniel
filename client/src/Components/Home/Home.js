import React,{ useState, useEffect } from "react";
import { Card, Button } from 'react-bootstrap';
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
            <div>
                <h1>Final Project - Identifying Atteckers Online</h1>
                <span className='span-home'>This project was made by: Daniel Aizenband</span>
            </div>
        </div>
    )
}

export default Home;