import React from "react";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import { useAuthContext } from "../../Hooks/useAuthContext";


//import './Management.css'
const Management = (props) => {
    const {user, setUser} = useAuthContext()

    return(
        <>
            {console.log('in management', user)}
            <h1>In Managment</h1>
            <Container style={{display: 'flex', justifyContent: 'center', alignItems: 'center', alignContent: 'center'}}>
                <Row xs={'auto'}>
                    <Col className="p-1">
                        <Card style={{ width: '18rem', padding: '10px', margin: '30px', borderWidth: '2px'}}>
                            <Card.Body>
                                <Card.Title>Card Title</Card.Title>
                                <Card.Text>
                                Some quick example text to build on the card title and make up the bulk of
                                the card's content.
                                </Card.Text>
                                <Button variant="primary">Go somewhere</Button>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col className="p-1">
                        <Card style={{ width: '18rem', padding: '10px', margin: '30px', borderWidth: '2px'}}>
                            <Card.Body>
                                <Card.Title>Card Title</Card.Title>
                                <Card.Text>
                                Some quick example text to build on the card title and make up the bulk of
                                the card's content.
                                </Card.Text>
                                <Button variant="primary">Go somewhere</Button>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col className="p-1">
                        <Card style={{ width: '18rem', padding: '10px', margin: '30px', borderWidth: '2px'}}>
                            <Card.Body>
                                <Card.Title>Card Title</Card.Title>
                                <Card.Text>
                                Some quick example text to build on the card title and make up the bulk of
                                the card's content.
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