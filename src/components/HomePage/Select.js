import React from 'react'
import { useLocation,useNavigate } from 'react-router-dom';
import { useState,useEffect } from 'react';
import axios from 'axios';

//css
import '../button.css'
import './Select.css'
import './preloader.css'
const Select = () => {
  const Navigate=useNavigate();
  const [userdata,setUserdata]=useState([]);
  const [busdata,setBusdata]=useState([]);
//search details
  const [from,setFrom]=useState("");
  const [to,setTo]=useState("");
  const [date,setDate]=useState("");
  // const [flag,setFlag]=useState()
  useEffect(()=>{
    axios.get("https://booking-app-serverside.herokuapp.com/login")
         .then(res=>setUserdata(res.data));
    axios.get("https://booking-app-serverside.herokuapp.com/bus")
         .then(res=>setBusdata(res.data));;
  },[])

  const locationPath=decodeURI(useLocation().pathname);
  // console.log(locationPath);
  const id=locationPath.substring(locationPath.lastIndexOf("user/")+5)
  // console.log(id);
  //reset function to clear search inputs
  const reset=(e)=>{
    e.preventDefault();
    setFrom("");
    setTo("");
    setDate("");
  }
  //move into next page
  const changePage=(bus_id)=>{
   setTimeout(() => {
      Navigate(`/select/user/${id}/seat/bus/${bus_id}`);
   }, 1000);
  }
  return (
    <div className="Select">
          <div className="row">
            <div className="col-sm-12">
                  <a href="/login" style={{textDecoration:'none',fontSize:16,float:'right',paddingRight:50,color:'#fff',opacity:0.5,paddingTop:10}}><i className="fa-solid fa-user"></i> Log-Out</a>
            </div>
          </div>
          <div className="row" style={{marginTop:60}}>
            <div className="col-sm-1"></div>
            <div className="col-sm-10">
                   <div className="container">
                       <div className="row">
                            <div className="choose">
                                <div className="a text-center btn btn-primary" style={{padding:4,borderRadius:2}}>
                                       <a href={`/select/user/${id}`}  style={{fontSize:17,color:'#fff'}}>Select Bus</a>
                                </div>
                                <div className="b text-center" style={{padding:4}}>
                                <a href="#" style={{fontSize:15,color:'blue'}}>Select Seat</a>
                                </div>
                                <div className="c text-center" style={{padding:4}}>
                                <a href="#" style={{fontSize:15,color:'blue'}}>Payment</a>
                                </div>
                                <div className="d"></div>
                            </div>
                       </div>
                       <div className="row">
                             <div className="bus">
                                <div className=""  style={{border:'1px solid blue',backgroundColor:'#3db0fc',opacity:0.7}}>
                                    <form action="" style={{margin:10}}>
                                        <div className="row">
                                          <div className="col-sm-4 text-center">
                                          <input type="text" className="form-control my-1" value={from} id='from' placeholder='From' onChange={(e)=>setFrom(e.target.value)} />
                                          </div>
                                          <div className="col-sm-4 text-center">
                                          <input type="text" className="form-control my-1" value={to }id='to' placeholder='To' onChange={(e)=>setTo(e.target.value)} />
                                          </div>
                                          <div className="col-sm-4 text-center">
                                          <input type="date" className="form-control my-1" value={date} id='date' onChange={(e)=>{setDate(e.target.value)}}/>
                                          </div>
                                        </div>
                                    </form>
                                    <div className="reset">
                                      <a style={{float:'right',fontSize:12,marginRight:10,cursor:'pointer'}} onClick={reset}>RESET</a>
                                    </div>
                                    <br />
                                    <br />
                                   {busdata==""?<div className='main-circle' style={{margin:20}}><div className='circle'></div></div>
                                   :
                                   <div className="row"  style={{margin:1,padding:10}}>
                                     {
                                           busdata.map((bus)=>
                                           from==""||to==""||date==""?
                                          <div className="details text-dark col-md-4 my-1" style={{backgroundColor:'#fff',padding:5,borderRadius:4,border:'1px solid #3db0fc'}}>
                                                 <h4 className='text-center bus-name' style={{fontWeight:'bold',cursor:'pointer'}}>{bus.name}</h4>
                                                 <h6 className='text-center'>From -><span style={{fontWeight:'bold',cursor:'pointer'}}>  {bus.from}</span></h6>
                                                 <h6 className='text-center'>To----><span style={{fontWeight:'bold',cursor:'pointer'}}>  {bus.to}</span></h6>
                                                 <h6 className='text-center'>Date:<span style={{fontWeight:'bold'}}> {bus.startingDate} At {bus.startingTime}</span></h6>
                                                 <h6 className='text-center'>Price:<span style={{fontWeight:'bold'}}>Rs.{bus.ticket}</span></h6>
                                                 <div className="text-center">
                                                 <button className='custom-btn btn-3' onClick={()=>changePage(bus._id)}><span>Book Now</span></button>
                                                 </div>
                                          </div>
                                           :
                                            from!=""&&to!=""&&date!=""?
                                            from.toLowerCase()==bus.from.toLowerCase()&&to.toLowerCase()==bus.to.toLowerCase()&&date==bus.startingDate?
                                          <div className="details text-dark col-md-4 mx-1 my-1" style={{backgroundColor:'#fff',padding:5,borderRadius:4}}>
                                            <h4 className='text-center bus-name' style={{fontWeight:'bold',cursor:'pointer'}}>{bus.name}</h4>
                                            <h6 className='text-center'>From -><span style={{fontWeight:'bold',cursor:'pointer'}}>  {bus.from}</span></h6>
                                            <h6 className='text-center'>To----><span style={{fontWeight:'bold',cursor:'pointer'}}>  {bus.to}</span></h6>
                                            <h6 className='text-center'>Date:<span style={{fontWeight:'bold'}}> {bus.startingDate} At {bus.startingTime}</span></h6>
                                            <h6 className='text-center'>Price:<span style={{fontWeight:'bold'}}>Rs.{bus.ticket}</span></h6>
                                            <div className="text-center">
                                               <button className='custom-btn btn-3' onClick={()=>changePage(bus._id)}><span>Book Now</span></button>
                                            </div>
                                         </div>
                                            :""
                                            :
                                            ""
                                         //  {from!==""?<h1>none</h1>:
                                         //  <h1>{bus.name}</h1>
                                         
                                         // } 
                                          )
                                     }
                                   </div>
                                   }
                                </div>
                             </div>
                       </div>
                   </div>
            </div>
            <div className="col-sm-1"></div>
          </div>
          <br /> <br />
    </div>
  )
}

export default Select