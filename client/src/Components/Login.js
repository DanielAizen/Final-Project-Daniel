import { Link } from 'react-router-dom'

const Login = () =>{
    return(
        <div>
            <h1>Testing login</h1>
            <p>add login form</p>
            <Link to='/signup'><p>Signup here</p></Link>
        </div>
    )
}

export default Login