import React, { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../../Hooks/useAuthContext";

import "./QueryPage.css";

const QueryPage = (props) => {
    const {user} = useAuthContext();
    const navigate = useNavigate()
    const [data, setData] = useState([]);

    /*useEffect(() =>{
        const newSocket = io(props.honeypot_url);
        setSocket(newSocket);
        newSocket.on('getAllData', dataFS => {
            setData(dataFS);
        });
    }, []);*/

    useEffect(() => {
        fetch(props.honeypot_url + '/honeypot/get_all', {headers: {'Access-Control-Allow-Origin': '*', 'Content-Type': 'application/json', 'Cache-Control': 'no-cache, no-store, must-revalidate'}})
        .then(response => response.json())
        .then(response => {
            console.log(response);
            if (response.status === 200){
                setData(response.result);
            }
        })
        .catch(err => {
            console.log(err);
        })
    }, []);

    const handleSearch = () => {
        const searchValue = document.querySelector("#search").value;
        console.log(searchValue);
        /*handleChangePage(1, searchValue === null ? "" : searchValue);
        setCurrentSearch(searchValue === null ? "" : searchValue);*/
    };

    return(
        <>
            <div className="query-container flexColumn">
                <div className="query-container-header flexRow">
                    <Button variant="outline-primary" size="lg" onClick={() => navigate('/')} >Go back home</Button>
                    <Button variant="outline-primary" size="lg" onClick={() => navigate('/management')} >Go back</Button>
                </div>
                <div className="query-seacrh flexRow">
                    <div className="text-1">
                        <input id="search" placeholder="Search" onKeyUp={() => handleSearch()} />
                    </div>
                </div>
                <div className="query-table flexRow">
                    <table cellSpacing="0" cellPadding="0">
                        <thead>
                            <tr>
                                {/**TODO add a database to show fake logs */}
                            </tr>
                        </thead>
                    </table>
                </div>
            </div>
            {/*<Container style={{display: 'flex', justifyContent: 'center', alignContent: 'center', alignItems: 'center'}}>


                <InputGroup className="mb-3" style={{width: '40%', marginTop:"10%", borderWidth: "2px"}}>
                    <FormControl
                        placeholder="Search"
                        aria-label="search-bar"
                        aria-describedby="basic-addon1"
                    />
                    <Button variant="secondary" style={{position:'relative', marginLeft: '10px', height: "40px"}}>Search</Button>
                </InputGroup>

            </Container>*/}
        </>
    )
}

export default QueryPage;