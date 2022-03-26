import React from "react";
import { Button } from 'react-bootstrap';
import { Link } from "react-router-dom";
import { useAuthContext } from "../../Hooks/useAuthContext";

import './Home.css'

const Home = () =>{
    const {user} = useAuthContext() 
    return(
        <div className="Home">
            {console.log("im home",user.is_auth)}
            {!user.is_auth ? 
                <Link to="/management">
                    <div className="main-div">
                        <Button variant="outline-primary" size="lg">log in</Button>
                    </div>
                </Link>
                :
                <Link to="/login">
                    <div className="main-div">
                        <Button variant="outline-primary" size="lg">log in</Button>
                    </div>
                </Link>
            }

            <div>
                <h1>Final Project - Identifying Atteckers Online</h1>
                <span className='span-home'>This project was made by: Daniel Aizenband</span>
            </div>
        </div>
    )
}

export default Home;