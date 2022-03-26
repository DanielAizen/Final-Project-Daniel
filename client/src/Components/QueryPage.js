import React from "react";
import { Container, Row, Col, InputGroup, Button, FormControl} from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../Hooks/useAuthContext";

const QueryPage = ()=> {
    const {user} = useAuthContext();
    const navigate = useNavigate()
    
    return(
        <>
            <Container style={{display: 'flex', justifyContent: 'center', alignContent: 'center', alignItems: 'center'}}>
                <Button variant="outline-primary" size="lg" onClick={() => navigate('/')} style={{position: 'absolute',top: '30px', right: '50px'}}>Go back home</Button>

                <InputGroup className="mb-3" style={{width: '40%', marginTop:"10%", borderWidth: "2px"}}>
                    <FormControl
                        placeholder="Search"
                        aria-label="search-bar"
                        aria-describedby="basic-addon1"
                    />
                    <Button variant="secondary" style={{position:'relative', marginLeft: '10px', height: "40px"}}>Search</Button>
                </InputGroup>

            </Container>
        </>
    )
}

export default QueryPage;