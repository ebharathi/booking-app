import React from 'react'
import { useState,useEffect } from 'react';
import { useNavigate,useLocation } from 'react-router-dom';
import axios from 'axios';
import $ from 'jquery';

//node
import '../button.css';
import './Payment.css'
import Cards from 'react-credit-cards';
import 'react-credit-cards/es/styles-compiled.css';
const Payment = () => {
  const Navigate=useNavigate();
  const [userdata,setUserdata]=useState([]);
  const [busdata,setBusdata]=useState([]);
  useEffect(()=>{
    axios.get("https://booking-app-serverside.herokuapp.com/login")
         .then((res)=>setUserdata(res.data))
    axios.get("https://booking-app-serverside.herokuapp.com/bus")
         .then((res)=>setBusdata(res.data))
  },[])
  const locationPath=decodeURI(useLocation().pathname);
  // console.log(locationPath);
  const Userid=locationPath.substring(locationPath.lastIndexOf('/user')+6,locationPath.lastIndexOf('/seat'));
  // console.log(Userid);
  const Busid=locationPath.substring(locationPath.lastIndexOf('/bus')+5,locationPath.lastIndexOf('/payment'));
  // console.log(Busid);
  const count=locationPath.substring(locationPath.lastIndexOf('/count')+7,locationPath.lastIndexOf('/detail'));
  // console.log(count);
  const detail=[];
  for(let i=0;i<count;i++)
  {  
  // let i=0;
        if(i!=count-1)
        {
        const val=locationPath.substring(locationPath.lastIndexOf(`id${i}`)+4,locationPath.lastIndexOf(`id${i+1}`)-1);
        // console.log(val);
        detail.push(val);
        }
        if(i==count-1)
        {
        const val=locationPath.substring(locationPath.lastIndexOf(`id${i}`)+4,locationPath.lastIndexOf('-'));
        // console.log(val);
        detail.push(val);
        }
  }
  // console.log(detail);
 //credit card
 const [cvc,setCVC]=useState("");
 const [expiry,setEXPIRY]=useState("");
 const [focus,setFOCUS]=useState("");
 const [name,setNAME]=useState("");
 const [number,setNUMBER]=useState("")

 const allDone=(e)=>{
   e.preventDefault();
  if(cvc==""||expiry==""||name==""||number=="")
  {
    $('.error').show();
    setTimeout(() => {
        $('.error').hide();
    }, 5000);
  }
  else
  {
    
   let newArr=[];
   busdata.map(bd=>
     bd._id==Busid?
          bd.seats.map(s=>{
            newArr.push(s);
          })
     :
     ""
   )
  //  console.log(newArr);
   let selectedArr=[];
   detail.map(d=>{
        selectedArr.push(d.substring(0,2))
   }) 
  //  console.log(selectedArr);
  //  let filteredArr=[];
  //  newArr.map(n=>{
  //    selectedArr.map(s=>{
  //      if(s!=n)
  //        filteredArr.push(n);
  //    })
  //  })
  //  console.log(filteredArr);
  //  let FinalArr=[...new Set(filteredArr)];
  //  console.log(FinalArr);

  var array1 =newArr;
  var array2 = selectedArr;
  
  for (var i = 0; i<array2.length; i++) {
      var arrlen = array1.length;
      for (var j = 0; j<arrlen; j++) {
          if (array2[i] == array1[j]) {
              array1 = array1.slice(0, j).concat(array1.slice(j+1, arrlen));
          }
      }
  }
  // console.log(array1);
    
    setTimeout(() => {
     axios.post(`https://booking-app-serverside.herokuapp.com/bus/update/${Busid}`,{
        seats:array1
     })
     .then((res)=>{
       console.log(res.data);
       setCVC("");
       setNAME("");
       setEXPIRY("");
       setNUMBER("");
      $('.success').show();
      $('.btn-11').attr("disabled","disabled");
      setTimeout(() => {
         Navigate(`/select/user/${Userid}`);
      }, 7000); 

     });
  }, 1000);
  }

 }
  return (
    <div className='payment'>
          <div className="row">
            <div className="col-sm-12">
                  <a href="/login" style={{textDecoration:'none',fontSize:16,float:'right',paddingRight:50,color:'#fff',opacity:0.5,paddingTop:10}}><i className="fa-solid fa-user"></i> Log-Out</a>
            </div>
          </div>
          <div className="row" style={{marginTop:30}}>
            <div className="col-sm-1"></div>
            <div className="col-sm-10">
              <div className="container">
                   <div className="row">
                                <div className="choose">
                                    <div className="a text-center" style={{padding:4}}>
                                          <a href={`/select/user/${Userid}`}  style={{fontSize:15,color:'blue'}}>Select Bus</a>
                                    </div>
                                    <div className="b text-center my-1" style={{padding:4}}>
                                    <a href={`/select/user/${Userid}/seat/bus/${Busid}`} style={{fontSize:15,color:'blue'}}>Select Seat</a>
                                    </div>
                                    <div className="c text-center btn btn-primary" style={{padding:4,borderRadius:2}}>
                                    <a href={locationPath} style={{fontSize:17,color:'#fff'}}>Payment</a>
                                    </div>
                                    <div className="d"></div>
                                </div>
                  </div>
                  <div className="row">
                    <div className="payment">
                      <div className="" style={{border:'',backgroundColor:'',opacity:0.7,marginLeft:0}}>
                                 <div className="container" style={{backgroundColor:'#3db0fc'}}>
                                        <div className="row py-4">
                                          <div className="col-md-7">
                                          <Cards
                                              cvc={cvc}
                                              expiry={expiry}
                                              focused={focus}
                                              name={name}
                                              number={number}
                                           />
                                            <br />
                                           <form action="" className='text-center'>
                                           <input
                                            type="tel"
                                            name="number"
                                            placeholder="CARD NUMBER(Start with Correct Card-Codes)"
                                            onChange={(e)=>setNUMBER(e.target.value)}
                                            onFocus={(e)=>setFOCUS(e.target.name)}
                                            style={{width:280,padding:'6px 4px',borderRadius:3,border:'1px solid grey '}}
                                          />
                                           <br /> <br />
                                           <input
                                            type="text"
                                            name="name"
                                            placeholder="NAME"
                                            onChange={(e)=>setNAME(e.target.value)}
                                            onFocus={(e)=>setFOCUS(e.target.name)}
                                            style={{width:280,padding:'6px 4px',borderRadius:3,border:'1px solid grey '}}
                                          />
                                          <br /><br />
                                              <input
                                                    type="tel"
                                                    name="expiry"
                                                    placeholder="EXPIRY"
                                                    onChange={(e)=>setEXPIRY(e.target.value)}
                                                    onFocus={(e)=>setFOCUS(e.target.name)}
                                                    style={{padding:'6px 4px',width:280,borderRadius:3,border:'1px solid grey '}}
                                                  />
                                                  <br /><br />
                                             <input
                                                    type="tel"
                                                    name="cvc"
                                                    placeholder="CVC"
                                                    onChange={(e)=>setCVC(e.target.value)}
                                                    onFocus={(e)=>setFOCUS(e.target.name)}
                                                    style={{padding:'6px 1px',width:80,borderRadius:3,border:'1px solid grey '}}
                                                  />
                                                  <br /><br />
                                              <div className="error text-danger" style={{fontWeight:'bolder',display:'none'}}>PLEASE ENTER ALL DETAILS REQUIRED!</div>
                                              <div className="success text-success" style={{fontWeight:'bolder',display:'none'}}>SUCCESSFULLY REGISTERED! <br/>PLEASE WAIT WHILE REDIRECTING TO HOME PAGE</div>
                                                  <div className="text-center">
                                                  <button type='submit' className='custom-btn btn-11' onClick={allDone}>PAY <div className="dot"></div> </button> 
                                                  </div>
                                           </form>
                                          </div>
                                          <div className="col-md-5" style={{backgroundColor:'#fff',opacity:1,borderRadius:4}}>
                                               <h4 className='text-center details' style={{fontWeight:'bold'}}>Booking Details</h4>
                                               <div className="row p-1" style={{border:''}}>
                                                               <div className="col-6 text-center">
                                                                        <h6 className='details' style={{fontWeight:'bold'}}>Username</h6>
                                                               </div>
                                                               <div className="col-6 text-center">
                                                                     {
                                                                       userdata.map(u=>
                                                                        u._id==Userid?
                                                                        <h6 className='details' style={{fontWeight:'lighter'}}>{u.username}</h6>
                                                                        :
                                                                        ''
                                                                        )
                                                                     }
                                                               </div>
                                               </div>
                                               <hr />
                                               <div className="row p-1">
                                                             <div className="col-6 text-center">
                                                                     <h6 className='details' style={{fontWeight:'bold'}}>Agency</h6>
                                                             </div>
                                                             <div className="col-6 text-center">
                                                               {
                                                                 busdata.map(bd=>
                                                                  bd._id==Busid?
                                                                  <h6 className='details' style={{fontWeight:'bold'}}>{bd.name}</h6>
                                                                   :""
                                                                  )
                                                               }
                                                             </div>
                                               </div>
                                               <div className="row p-1">
                                                             <div className="col-6 text-center">
                                                                     <h6 className='details' style={{fontWeight:'bold'}}>Date</h6>
                                                             </div>
                                                             <div className="col-6 text-center">
                                                               {
                                                                 busdata.map(bd=>
                                                                  bd._id==Busid?
                                                                  <h6 className='details' style={{fontWeight:'bold'}}>{bd.startingDate}</h6>
                                                                   :""
                                                                  )
                                                               }
                                                             </div>
                                               </div>
                                               <div className="row p-1">
                                                             <div className="col-6 text-center">
                                                                     <h6 className='details' style={{fontWeight:'bold'}}>From</h6>
                                                             </div>
                                                             <div className="col-6 text-center">
                                                               {
                                                                 busdata.map(bd=>
                                                                  bd._id==Busid?
                                                                  <h6 className='details' style={{fontWeight:'bold'}}>{bd.from}</h6>
                                                                   :""
                                                                  )
                                                               }
                                                             </div>
                                               </div>
                                               <div className="row p-1">
                                                             <div className="col-6 text-center">
                                                                     <h6 className='details' style={{fontWeight:'bold'}}>To</h6>
                                                             </div>
                                                             <div className="col-6 text-center">
                                                               {
                                                                 busdata.map(bd=>
                                                                  bd._id==Busid?
                                                                  <h6 className='details' style={{fontWeight:'bold'}}>{bd.to}</h6>
                                                                   :""
                                                                  )
                                                               }
                                                             </div>
                                               </div>
                                               <hr />
                                               <div className="row p-1">
                                                             <div className="col-6 text-center">
                                                                     <h6 className='details' style={{fontWeight:'bold'}}>Passengers</h6>
                                                                     {
                                                                       detail!=""?
                                                                      detail.map(d=>
                                                                        <h6 className='details' style={{fontWeight:'bold'}}>{d.substring(2)}</h6>
                                                                        )
                                                                       :
                                                                       ""
                                                                     }
                                                             </div>
                                                             <div className="col-6 text-center">
                                                                      <h6 className="details" style={{fontWeight:'bold'}}>Seat No.</h6>
                                                                      {
                                                                       detail!=""?
                                                                      detail.map(d=>
                                                                        <h6 className='details' style={{fontWeight:'bold'}}>{d.substring(0,2)}</h6>
                                                                        )
                                                                       :
                                                                       ""
                                                                     }
                                                             </div>
                                               </div>
                                               <hr />
                                               <div className="row p-1">
                                                             <div className="col-6 text-center">
                                                               <h6 className="details" style={{fontWeight:'bold'}}>Ticket Count</h6>
                                                             </div>
                                                             <div className="col-6 text-center">
                                                               <h6 className="details" style={{fontWeight:'bold'}}>{count}</h6>
                                                             </div>
                                               </div>
                                               <div className="row p-1">
                                                             <div className="col-6 text-center">
                                                               <h6 className="details" style={{fontWeight:'bold'}}>Total Amount</h6>
                                                             </div>
                                                             <div className="col-6 text-center">
                                                               {
                                                                 busdata.map(bd=>
                                                                  bd._id==Busid?
                                                                  <h6 className="details" style={{fontWeight:'bold'}}>Rs.{bd.ticket*count}</h6>
                                                                  :""
                                                                  )
                                                               }
                                                             </div>
                                               </div>
                                               <hr />
                                               <div className="row p-1">
                                                             <div className="col-6 text-center">
                                                               <h6 className="details" style={{fontWeight:'bold'}}>Contact</h6>
                                                             </div>
                                                             <div className="col-6 text-center">
                                                               {
                                                                 busdata.map(bd=>
                                                                  bd._id==Busid?
                                                                  <h6 className="details" style={{fontWeight:'bold',cursor:'pointer'}}>{bd.contact}</h6>
                                                                  :""
                                                                  )
                                                               }
                                                             </div>
                                               </div>
                                          </div>
                                        </div>
                                 </div>
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

export default Payment