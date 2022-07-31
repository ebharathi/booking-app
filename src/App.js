import React from 'react'
import {BrowserRouter as Router,Routes,Route,Navigate,Switch} from 'react-router-dom';
//compoents
import Start from './components/Start';
import Login from './components/Login'
import Signup from './components/Signup';

import Select from './components/HomePage/Select';
import Seat from './components/HomePage/Seat';
import Payment from './components/HomePage/Payment';
const App = () => {
  return (
    <Router>
          <Routes>
                <Route exact path="/" element={<Start />}/>
                <Route exact path="/login" element={<Login />}/>
                <Route exact path="/signup" element={<Signup />}/>
                <Route exact path="/select/user/:id" element={<Select />} />
                <Route exact path="/select/user/:id/seat/bus/:id" element={<Seat />} />
                <Route exact path="/select/user/:id/seat/bus/:id/payment/count/:id/detail/:id" element={<Payment />} />
          </Routes>
    </Router>
  )
}

export default App