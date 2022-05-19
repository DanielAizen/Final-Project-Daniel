import React,{ useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { Button } from 'react-bootstrap';

import './Login.css';
import { useAuthContext } from '../../Hooks/useAuthContext';

const Login = (props) =>{
    const [inputError, setInputError] = useState(null)
    const { register, handleSubmit, formState:{errors}} = useForm()
    const navigate = useNavigate()
    const { setUser } = useAuthContext()

    const onFormSubmit = (value) =>{
        const username = value.username;
        const password = value.password;

        const requestOptions = {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            withCredentials: true,
            body: JSON.stringify({'username': username, 'password': password})
        };
        fetch(props.base_url + '/users/login', requestOptions)
        .then(response => response.json())
        .then(response => {
            if (response.status === 200){
                console.log(response);
                document.cookie = "loginToken=" + response.result;
                navigate('/management');
                setUser({user: username, auth_token: response.result, is_auth: true})
            }
            else{
                setInputError("Either username or password are incorrect");
            }
        }).catch(err => {
            console.log(err);
            setInputError("Oops, an error has occoured, try again");
        });
    };

    return(
        <>
            <div className='btn-container'>
                <Button variant="outline-primary" onClick={() => navigate('/')}>Sign Out</Button>
            </div>
            <div className='login-page flexbox-container'>
                <div className='flexbox-item-1'>
                    <form className='login-form ' onSubmit={handleSubmit(onFormSubmit)}>
                        <div className='form-header'>
                            <h3>Sign-In</h3>
                        </div>
                        <div className='login-container'>
                            <label>Username:
                                <input
                                    {...register("username", {
                                        required: true,
                                        pattern: /\D+$/i,
                                        maxLength:20
                                    })}
                                    placeholder="Enter your username please"
                                />
                                {errors?.username?.type === "required" && <p className='p-login'>This field is required</p>}
                                {errors?.username?.type === "pattern" && (<p className='p-login'>Must Contain only alphabetical characters</p>)}
                                {errors?.username?.type === "maxLength" && (<p className='p-login'>First name cannot exceed 20 charcters</p>)}
                            </label>
                            <label>Password:
                                <input
                                    {...register("password", {
                                        required: true,

                                    })}
                                    placeholder="Enter your password please"
                                    type='password'
                                />
                                {errors?.password?.type === "required" && <p className='p-login'>This field is required</p>}
                            </label>
                            <input type="submit" value="Submit"/>
                        </div>
                        <div className='flexbox-error'>
                            <span className='span-login'>{inputError ? inputError : ""}</span>
                        </div>
                    </form>  
                </div> 
                <div className='flexbox-item-2'>
                    <Link to='/signup'>Signup here</Link>
                </div>
            </div>
        </>
    )
}

export default Login;