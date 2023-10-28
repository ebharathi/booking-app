import React from 'react'
import {BrowserRouter as Router,Routes,Route,Navigate,Switch} from 'react-router-dom';
//compoents
import Start from './components/Start';
import Login from './components/Login'
import Signup from './components/Signup';
const App = () => {
  return (
    <Router>
          <Routes>
                <Route exact path="/" element={<Start />}/>
                <Route exact path="/login" element={<Login />}/>
                <Route exact path="/signup" element={<Signup />}/>
          </Routes>
    </Router>
  )
}

export default App