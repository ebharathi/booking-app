import React from 'react'
import $ from 'jquery'
import {useNavigate} from 'react-router-dom'
//css
import './Start.css'
import './button.css'
const Start = () => {
      const Navigate=useNavigate();
     const start=()=>{
              setTimeout(() => {
                   Navigate('/login') 
              }, 100);
     }
  return (
    <div className='Start'>
          {/* <p>Welcome to my codepen profile: <br /><a href="https://codepen.io/grohit/">codepen.io/grohit</a></p> */}
          <div className="container">
          <div className="row" style={{marginTop:185}}>
                 <div className="col-sm-6"></div>
                 <div className="col-sm-6">
                        <h2 style={{fontWeight:'lighter'}}>ALWAYS TRAVEL <span className='p' style={{fontWeight:''}}>FASTER SAFER</span></h2>
                        <br />
                        <br />
                        <br />
                        <br />
                        <br /><br />
                        <br /><br /><br />
                        <br /><br /><br /><br />
                        <button className="custom-btn btn-15" onClick={start} style={{float:'right',width:200}}><span>GET STARTED!</span></button>
                 </div>
           </div>
          </div>
      <div className='row' style={{marginTop:200}}>

      </div>
    </div>
  )
}

export default Start