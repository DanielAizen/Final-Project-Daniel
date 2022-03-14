import './App.css';
import Login from './Components/Login';
import Signup from './Components/Signup';
import Home from './Components/Home';
import { BrowserRouter ,Routes, Route, Navigate, Redirect } from 'react-router-dom';

function App() {

  const user = 1;
  return (
    <div className="App">
      <h1> in react app</h1>
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
