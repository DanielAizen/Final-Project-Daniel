import { Link } from 'react-router-dom';
import { Form, Button, Card } from 'react-bootstrap';

import './Login.css';

const Login = () =>{
    const handleLogin = (e) =>{
        e.preventDefault();
        const username = document.getElementById("form-username");
        const password = document.getElementById("form-password");
    }
    return(
        <div>
            <h1>Testing login</h1>
            <div className='login-form'>
                <Card style={{width: '50rem'}}>
                    <Form>
                        <Form.Group className='mb-3' controlId='form-username'> {/* change later on to support email */}
                            <Form.Label>Username</Form.Label>
                            <Form.Control type='text' row={3} placeholder='Enter your username'/>                    
                        </Form.Group>

                        <Form.Group className='mb-3' controlId='form-password'>
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password" placeholder='Enter your password'/>    
                        </Form.Group>
                        <Button variant='primary' type='submit' onClick={(e) => handleLogin()}>Submit</Button>   
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