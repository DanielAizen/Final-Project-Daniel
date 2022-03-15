import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Login from './Components/Login/Login';
import Signup from './Components/Signup/Signup';
import Home from './Components/Home/Home';
import { BrowserRouter ,Routes, Route, Navigate, Redirect } from 'react-router-dom';

function App() {

  const user = 1;
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home/>}/>
          <Route exact path="/login" element={<Login />}/>
          <Route exact path='/login'>
            {/*user ? <Redirect to =*/}
          </Route>
          <Route path='/signup' element={<Signup/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
