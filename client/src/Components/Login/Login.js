import React,{ useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Form, Button, Card } from 'react-bootstrap';

import './Login.css';

const Login = () =>{
    const navigate = useNavigate()
    const [inputError, setInputError] = useState(null)

    const handleLogin = (e) =>{
        e.preventDefault();
        const username = document.getElementById("form-username").value;
        const password = document.getElementById("form-password").value;
        if (username.length <= 0 || password.length <=0 ){
            setInputError("Please enter both email and password");
            return
        }
        const requestOptions = {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({'username': username, 'password': password})
        };
        fetch('http://localhost:5000/users/login', requestOptions)
        .then(response => response.json())
        .then(response => {
            if (response.status === 200){
                console.log(response);
                navigate('/management');
            }
            else{
                setInputError(response.msg);
            }
        }).catch(err => {
            console.log(err);
            setInputError("Oops, an error has occoured, try again");
        });
    };

    return(
        <div>
            <h1>Testing login</h1>
            <div className='login-form'>
                <Card style={{width: '20rem'}}>
                    <Form>
                        <Form.Group className='mb-3' controlId='form-username'> {/* change later on to support email */}
                            <Form.Label>Username</Form.Label>
                            <Form.Control type='text' row={3} placeholder='Enter your username'/>                    
                        </Form.Group>

                        <Form.Group className='mb-3' controlId='form-password'>
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password" placeholder='Enter your password'/>    
                        </Form.Group>
                        <Button variant='primary' type='submit' onClick={(e) => handleLogin(e)}>Submit</Button>   
                    </Form>
                </Card> 
            </div>
            <div className='add'>
                <p>add login form</p>
                <Link to='/signup'><p>Signup here</p></Link>
            </div>
        </div>
    )
}

export default Login