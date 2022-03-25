import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Login from './Components/Login/Login';
import Signup from './Components/Signup/Signup';
import Home from './Components/Home/Home';
import Management from './Components/Management/Management'
import { BrowserRouter ,Routes, Route, Navigate } from 'react-router-dom';
import { useState } from 'react';
import { useAuthContext } from './Hooks/useAuthContext';
import { AuthContextProvider } from './AuthContext/authContext';

function App() {
  const base_url = window.location.protocol + "//" + window.location.hostname + ":5000";
  //const [user, setUser] = useState(undefined);
  const {user, setUser} = useAuthContext()
  

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home/>}/>
          <AuthContextProvider>
            {console.log("in app", user)}
            {!user && <Route exact path="/login" element={<Login base_url={base_url} setUser={(userInfo) => setUser(userInfo)}/>}/>}
            {user && <Route exact path="/login" element={<Navigate replace to='/management' base_url={base_url} userInfo={user}/>}/>} 
            {!user && <Route exact path="/management" element={<Navigate replace to='/login' base_url={base_url} setUser={(userInfo) => setUser(userInfo)}/>}/>}
            {user && <Route exact path='/management' element={<Management base_url={base_url} userInfo={user}/>}/>}
          </AuthContextProvider>
          <Route path='/signup' element={<Signup/>}/>
      </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
