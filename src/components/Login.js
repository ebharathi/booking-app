import React from 'react'
import { useEffect,useState } from 'react'
import { useNavigate } from 'react-router-dom'
import $ from 'jquery';
import axios from 'axios';

const Login = () => {
     const [email,setEmail]=useState('');
     const [password,setPassword]=useState('');

    const [data,setData]=useState([]);

      const Navigate=useNavigate();
   
     //ueEffect
     useEffect(()=>{
      axios.get('https://booking-app-serverside.herokuapp.com/login')
      .then(response=>setData(response.data));
     },[])

      //functions
      const loginFunction=(e)=>{
            e.preventDefault();
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
             if(email!=="" &&password!=="")
             {
                   console.log(data)
                   data.map((d)=>{
                         if(d.email==email)
                         {
                               if(d.password==password)
                               {
                                            Navigate(`/select/user/${d._id}`)
                               }
                               else
                               {
                                    $('.match_error').show();
                                    setTimeout(() => {
                                    $('.match_error').hide();
                                    }, 5000); 
                               }
                         }
                         else
                               {
                                    $('.match_error').show();
                                    setTimeout(() => {
                                    $('.match_error').hide();
                                    }, 5000); 
                               }
                        
                   })
             }
      }

  return (
     <div className="Login" style={{marginTop:180}}>
            <div className="container">
                  <div className="row">
                        <div className="col-md-3"></div>
                        <div className="col-md-6" style={{border:'',borderRadius:4,padding:6}}>
                             <div className="container">
                             <div className="row">
                                    <div className="col-sm-4 a" style={{background:'#8c2ab0',opacity:1,padding:'20px 10px',borderTopLeftRadius:7,borderBottomLeftRadius:7}}>
                                          <h4 className='text-center' style={{fontWeight:'lighter',color:'white',paddingLeft:10}}>LOGIN</h4>
                                          <span style={{fontSize:12,paddingLeft:10,color:'#fff',fontWeight:'lighter'}}>Doesn't have an Account? <span className='ls' style={{color:'black',cursor:'pointer',fontWeight:'bold'}} onClick={()=>Navigate('/signup')}>Sign up</span> here</span>
                                          {/* <span></span> */}
                                    </div>
                                    <div className="col-sm-8 b" style={{backgroundColor:'#ffffff',opacity:1,borderTopRightRadius:7,borderBottomRightRadius:7,padding:'30px 10px'}}>
                                          <br />
                                          <h4 style={{fontWeight:'lighter'}}>Enter Credentials</h4><br />
                                           <form action="" className='text-center' onSubmit={loginFunction}>
                                                 <input type="email" className='form-control' placeholder='Email-id' onChange={(e)=>setEmail(e.target.value)} />
                                                 <div className='email_error' style={{fontSize:10,display:'none',color:'red'}}>Please Enter valid Email</div>
                                                 <br />
                                                 <input type="password" className='form-control' placeholder='Password' onChange={(e)=>setPassword(e.target.value)}/>
                                                 <div className='password_error' style={{fontSize:10,display:'none',color:'red'}}>Please Enter correct password</div>
                                                 <div className='match_error' style={{fontSize:10,display:'none',color:'red'}}>Email-id and Password doesn't match</div>
                                                 <br />
                                                 <button type='submit' className='custom-btn btn-8'><span>Login</span></button>
                                           </form>
                                    </div>
                              </div>
                             </div>
                        </div>
                        <div className="col-md-3"></div>
                  </div>
            </div>
             <div className="row" style={{marginBottom:500}}>
                   
             </div> 
     </div>
  )
}

export default Login