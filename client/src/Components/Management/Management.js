import React from "react";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../../Hooks/useAuthContext";


//import './Management.css'
const Management = (props) => {
    const {user, setUser} = useAuthContext();
    const navigate = useNavigate();

    const handleSignOut = () => {
        document.cookie = `loginToken=; path=/; domain=${props.base_url}`;
        setUser({
            user: null,
            token:null,
            is_auth: false
        })
        navigate('/');
        //Think about maybe creatin an endpoint for session end
    }

    return(
        <>
            <Button variant="outline-primary" size="lg" onClick={() => handleSignOut()} style={{position: 'absolute',top: '30px', right: '50px'}}>Sign-out</Button>
            <Button variant="outline-primary" size="lg" onClick={() => navigate('/')} style={{position: 'absolute',top: '30px', right: '200px'}}>Go Back Home</Button>
            <h1>In Managment- Hello {user.user}</h1>
            <Container style={{display: 'flex', justifyContent: 'center', alignItems: 'center', alignContent: 'center'}}>
                <Row xs={'auto'}>
                    <Col className="p-1">
                        <Card style={{ width: '18rem', padding: '10px', margin: '30px', borderWidth: '2px'}}>
                            <Card.Body>
                                <Card.Title>Stats overview</Card.Title>
                                <Card.Text>
                                Query logs for further information.
                                </Card.Text>
                                <Button variant="primary" onClick={() => navigate('/query')}>Go somewhere</Button>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col className="p-1">
                        <Card style={{ width: '18rem', padding: '10px', margin: '30px', borderWidth: '2px'}}>
                            <Card.Body>
                                <Card.Title>Team's area</Card.Title>
                                <Card.Text>
                                Get information about current project running, and weekly goals.
                                </Card.Text>
                                <Button variant="primary">Go somewhere</Button>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col className="p-1">
                        <Card style={{ width: '18rem', padding: '10px', margin: '30px', borderWidth: '2px'}}>
                            <Card.Body>
                                <Card.Title>Assignments</Card.Title>
                                <Card.Text>
                                Check the assignment that are distributed between team members.
                                </Card.Text>
                                <Button variant="primary">Go somewhere</Button>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Container>

        </> 
    )
}

export default Management;