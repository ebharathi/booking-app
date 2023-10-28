import React from 'react'
import {BrowserRouter as Router,Routes,Route,Navigate,Switch} from 'react-router-dom';
//compoents
import Start from './components/Start';
import Login from './components/Login'
import Signup from './components/Signup';
import Home from './components/HomePage/Home';
import Bus from './components/Bus/Bus';
const App = () => {
  return (
    <Router>
          <Routes>
                <Route exact path="/" element={<Start />}/>
                <Route exact path="/login" element={<Login />}/>
                <Route exact path="/signup" element={<Signup />}/>
                <Route exact path="/home/:id" element={<Home/>}/>
                <Route exact path="/bus/:id" element={<Bus/>}/>
          </Routes>
    </Router>
  )
}

export default App