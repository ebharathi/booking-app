import React from 'react'
import { useState,useEffect } from 'react'
import { useNavigate,useLocation } from 'react-router-dom'
import axios from 'axios';
import $ from 'jquery';


import './Select.css';
import './preloader.css';
const Seat = () => {
  const Navigate=useNavigate();
  const locationPath=decodeURI(useLocation().pathname);
  // console.log(locationPath);
  const Userid=locationPath.substring(locationPath.lastIndexOf('/user')+6,locationPath.lastIndexOf('/seat'));
  // console.log(Userid);
  const Busid=locationPath.substring(locationPath.lastIndexOf('/bus')+5);
  // console.log(Busid)
  let i=-1;
  const [flag,setFlag]=useState(false);
  const [next,setNEXT]=useState(false);
  const [selected,setSelected]=useState([]);
  const [busdata,setBusdata]=useState([]);
  const [userdata,setUserdata]=useState([]);
  const [seats,setSeats]=useState(["A1","B1","C1","A2","B2","C2","A3","B3","C3","A4","B4","C4","A5","B5","C5","A6","B6","C6","A7","B7","C7","A8","B8","C8","A9","B9","C9"]);
  let remain=[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1];
  useEffect(()=>{
     axios.get("https://booking-app-serverside.herokuapp.com/login/")
          .then((res)=>setUserdata(res.data))
     axios.get("https://booking-app-serverside.herokuapp.com/bus/")
          .then((res)=>setBusdata(res.data))
         setFlag(true);

  },[])
  if(busdata!="")
  {
         busdata.map(bd=>
           bd._id==Busid?
          bd.seats.map(bds=>
           
            seats.map((s,i)=>
            {
              if(s==bds)
              {
                 remain[i]=0;
              }
            
             } )
          )
          :''
          )
      
        //  console.log(remain);
  }
  const seatSelected=(e)=>{
      // console.log()
    // console.log(e.target.className);
    setSelected(Array.from(new Set([...selected, e.target.className])));
       
      }
  const remove=(e)=>{
    console.log('removed');
    var array1 =selected;
    var array2 =[e.target.className];
    
    for (var i = 0; i<array2.length; i++) {
        var arrlen = array1.length;
        for (var j = 0; j<arrlen; j++) {
            if (array2[i] == array1[j]) {
                array1 = array1.slice(0, j).concat(array1.slice(j+1, arrlen));
            }
        }
    }
    setSelected(array1);
  }
  // console.log(selected)
  //move to Payment Page
  const nextPage=()=>{
    var length=selected.length;
    var detail="";
    var i=0;
    let next=true;
    selected.map(s=>{
        var valueJQ=$(`.${s}-passenger`).val();
        if(valueJQ=="")
        {
           i--;
           next=false;
            alert("Please Enter all the required Fields");                    
        }
        // console.log(valueJQ);
        detail+="id"+i+"-"+s+valueJQ+"-";
        i++;
    })
    //  console.log(detail);
    if(next=true)
    {
      setTimeout(() => {
        Navigate(`/select/user/${Userid}/seat/bus/${Busid}/payment/count/${length}/detail/${detail}`)
      }, 500);
    }
  }
  return (
    <div className="seat">
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
                                    <div className="a text-center" style={{padding:4}}>
                                          <a href={`/select/user/${Userid}`}  style={{fontSize:14,color:'blue'}}>Select Bus</a>
                                    </div>
                                    <div className="b text-center btn btn-primary" style={{padding:4,borderRadius:2}}>
                                    <a href={`/select/user/${Userid}/seat/bus/${Busid}`} style={{fontSize:15,color:'#fff'}}>Select Seat</a>
                                    </div>
                                    <div className="c text-center" style={{padding:4}}>
                                    <a href="#" style={{fontSize:15,color:'blue'}}>Payment</a>
                                    </div>
                                    <div className="d"></div>
                                </div>
                          </div>
                          <div className="row">
                            <div className="seat">
                                <div className="" style={{border:'',backgroundColor:'#3db0fc',opacity:0.7}}>
                                          {busdata!=""?
                                            <div className="row" style={{margin:1,marginTop:'0px !important',border:''}}>
                                                         <div className="col-sm-4" style={{backgroundColor:'#fff',borderRadius:4,paddingBottom:20}}>
                                                               <div className="row">
                                                                 {
                                                                   flag==true?
                                                                    seats.map((s,i)=>
                                                                       remain[i]==0?
                                                                       <div className='text-center col-4' style={{padding:5,paddingTop:20,color:'green',cursor:'pointer'}}><span className={s} id="avail" onClick={seatSelected}>{s}</span> </div>
                                                                       :
                                                                       <div className='text-center col-4' style={{padding:5,paddingTop:20,color:'red'}}><span className='notavail'>{s}</span> </div>
                                                                    )
                                                                   :
                                                                  ""
                                                                  }
                                                               </div>
                                                         </div>
                                                         <br />
                                                         <div className="col-sm-8" style={{border:''}}>
                                                                  <div className="row" style={{border:'',margin:3}}>
                                                                       {
                                                                        busdata.map(bd=>
                                                                           bd._id==Busid?
                                                                      <div className="col-sm-12">
                                                                                    <h4 className="details text-center">{bd.name}</h4>
                                                                          <div className='selection' style={{border:'1px solid #fff'}}>
                                                                                      {
                                                                            selected!=""?
                                                                            selected.map(s=>
                                                                                <div className="container">
                                                                                   <span style={{float:'right',fontSize:19,cursor:'pointer',fontWeight:'bold'}} className={s} onClick={remove}>x</span>
                                                                                   <h6 className='text-center details' style={{fontWeight:'bold'}}>Seat No:{s}</h6>
                                                                                   <input type="text" className={`my-1 ${s}-passenger`} placeholder='Enter Passenger name'  style={{width:'200px',height:'35px',borderRadius:4}}/>
                                                                                   <br />
                                                                                   <input type="radio" id='male' value="male" name={`${s}-gender`} className={`mx-1`} />
                                                                                   <label htmlFor="male">Male</label>
                                                                                   <input type="radio" id='female' value="female" name={`${s}-gender`} className='mx-1' />
                                                                                   <label htmlFor="female">Female</label>
                                                                                   <hr style={{color:'#fff'}} />
                                                                                </div>
                                                                              )
                                                                              :
                                                                              <h4 className="text-center my-5">𝙽𝙾 𝚂𝙴𝙻𝙴𝙲𝚃𝙴𝙳 𝚂𝙴𝙰𝚃𝚂</h4>
                                                                            }
                                                                          </div>
                                                                          {selected.length>0?
                                                                           <div className="" style={{float:'right'}}>
                                                                             <button className='custom-btn btn-10' onClick={nextPage}>Confirm</button>
                                                                           </div>
                                                                          :
                                                                          ''
                                                                           }
                                                                      </div>
                                                                           :
                                                                           ''
                                                                          )
                                                                       }
                                                                     </div>
                                                              
                                                         </div>
                                            </div>
                                           :
                                           <div className='circle-main' style={{marginTop:100,marginBottom:100}}>
                                                         <div className="circle"></div>
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
          <div className='row' style={{marginTop:100}}></div>
    </div>
  )
}

export default Seat