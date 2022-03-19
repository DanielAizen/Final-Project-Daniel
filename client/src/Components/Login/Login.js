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
            withCredentials: true,
            body: JSON.stringify({'username': username, 'password': password})
        };
        fetch('http://localhost:5000/users/login', requestOptions)
        .then(response => response.json())
        .then(response => {
            if (response.status === 200){
                console.log(response);
                document.cookie = "loginToken=" + response.result;
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
        <div className='login-form'>
            <h2 className='mb-2'>Testing login</h2>
                <Card style={{width: '20rem'}}>
                    <Form>
                        <Form.Group className='mb-3' controlId='form-username'> {/* change later on to support email */}
                            <Form.Label className="mb-3">Username</Form.Label>
                            <Form.Control type='text' row={3} placeholder='Enter your username'/>                    
                        </Form.Group>

                        <Form.Group className='mb-3' controlId='form-password'>
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password" placeholder='Enter your password'/>    
                        </Form.Group>
                        <Button variant='primary' type='submit' onClick={(e) => handleLogin(e)}>Submit</Button>   
                    </Form>
                </Card> 
            <div className='add'>
                <p>add login form</p>
                <Link to='/signup'><p>Signup here</p></Link>
            </div>
        </div>
    )
}

export default Login