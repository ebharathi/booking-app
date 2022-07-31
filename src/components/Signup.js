import React from 'react'
import { useEffect,useState } from 'react'
import { useNavigate } from 'react-router-dom'
import $ from 'jquery';
import axios from 'axios';

const Signup = () => {
  const Navigate=useNavigate();
   const [username,setUsername]=useState("");
   const [email,setEmail]=useState("");
   const [password,setPassword]=useState("");
//flag to check if  email already exits in database
   const [flag,setFlag]=useState(true);
  
  //  const [data,setData]=useState([]);
  // useEffect(()=>{
  //   axios.get("http://localhost:5000/login")
  //      .then(res=>setData(res.data));
  // },[flag])
//function
const loginForm=(e)=>{
  e.preventDefault();
  // console.log(username+email+password)
  if(username=="")
  {
    $('.name_error').show();
    setTimeout(() => {
      $('.name_error').hide();
    }, 5000);
  }
  if(email=="")
  {
    $('.email_error').show();
    setTimeout(() => {
      $('.email_error').hide();
    }, 5000);
  }
  if(password=="")
  {
    $('.password_error').show();
    setTimeout(() => {
      $('.password_error').hide();
    }, 5000);
  }
  if(username!=""&&email!=""&&password!="")
  {
      // setFlag(true);
      // data.map(d=>d.email==email?setFlag(false):'');
      // if(flag==true)
      // {
        axios.post('https://booking-app-serverside.herokuapp.com/login/add',{
          username,
          email,
          password
        }).then(res=>setTimeout(() => {
          Navigate('/login');
        }, 1000))
          .catch(err=>{
          $('.exist_error').show();
        setTimeout(() => {
           $('.exist_error').hide();
        }, 5000);
          
      })
      // }
      // if(flag==false)
      // {
    
      // }  
  }
}
  return (
    <div className='Signup' style={{marginTop:180}}>
         <div className="container">
                  <div className="row">
                        <div className="col-sm-3"></div>
                        <div className="col-sm-6" style={{border:'',borderRadius:4,padding:6}}>
                             <div className="container">
                             <div className="row">
                                    <div className="col-sm-4 a" style={{background:'#8c2ab0',opacity:1,padding:'20px 10px',borderTopLeftRadius:7,borderBottomLeftRadius:7}}>
                                          <h4 className='text-center' style={{fontWeight:'lighter',color:'white',paddingLeft:10}}>SIGNUP</h4>
                                          {/* <p style={{fontSize:12,paddingLeft:10,color:'#fff'}}>Already have an Account? <span className='ls' style={{color:'black',cursor:'pointer'}} onClick={()=>Navigate('/login')}>Login </span> here</p> */}
                                          <h6 style={{fontSize:12,paddingLeft:10,color:'#fff',fontWeight:'lighter'}}>Already have an Account? <span className='ls' style={{color:'black',cursor:'pointer'}} onClick={()=>Navigate('/login')}>Login </span> here</h6>
                                    </div>
                                    <div className="col-sm-8 b" style={{backgroundColor:'#ffffff',opacity:1,borderTopRightRadius:7,borderBottomRightRadius:7,padding:'30px 10px'}}>
                                          <br />
                                          <h4 style={{fontWeight:'lighter'}}>Enter Credentials</h4><br />
                                           <form action="" className='text-center' onSubmit={loginForm}>
                                                 <input type="text" className='form-control' placeholder='Username' onChange={(e)=>setUsername(e.target.value)} />
                                                 <div className='name_error' style={{fontSize:10,display:'none',color:'red'}}>Please Fill the Username</div>
                                                 <div className='exist_error' style={{fontSize:10,display:'none',color:'red'}}>Email or Username Already Exist!</div>
                                                 <br />
                                                 <input type="email" className='form-control' placeholder='Email-id' onChange={(e)=>setEmail(e.target.value)} />
                                                 <div className='email_error' style={{fontSize:10,display:'none',color:'red'}}>Please Fill the Email</div>
                                                 <div className='exist_error' style={{fontSize:10,display:'none',color:'red'}}>Email or Username Already Exist!</div>
                                                 <br />
                                                 <input type="password" className='form-control' placeholder='Password' onChange={(e)=>setPassword(e.target.value)}/>
                                                 <div className='password_error' style={{fontSize:10,display:'none',color:'red'}}>Please Fill the Password</div>
                                                 <br />
                                                 <button type='submit' className='custom-btn btn-8' style={{paddingRight:10}}><span>Sign Up</span></button>
                                           </form>
                                    </div>
                              </div>
                             </div>
                        </div>
                        <div className="col-sm-3"></div>
                  </div>
            </div>
    </div>
  )
}

export default Signup