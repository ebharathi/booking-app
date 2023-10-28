import React, { useEffect, useState } from 'react';
import { useParams,useNavigate } from 'react-router-dom';
import Cards from 'react-credit-cards';
import 'react-credit-cards/es/styles-compiled.css';
import axios from 'axios';
const CreditCard=()=>{
    const {id,userid}=useParams()
    const Navigate=useNavigate()
    const [btn,setBtn]=useState("PAY")
    const [success,setSuccess]=useState("");
    const [name,setName]=useState("");
    const [number,setNumber]=useState("");
    const [cvc,setCvc]=useState("");
    const [expiry,setExpiry]=useState("");
    const [focused,setFocused]=useState("");
    const [expiryMonthSelect,setExpiryMonthSelect]=useState("");
    const [expiryYearSelect,setExpiryYearSelect]=useState("");
    const [err,setErr]=useState("");
    //for expiry date
    let months=["01","02","03","04","05","06","07","08","09","10","11","12"];
    let year=[23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40];
    //useEffect for expirydate select
    useEffect(()=>{
        setExpiry(expiryMonthSelect+expiryYearSelect);
    },[expiryMonthSelect,expiryYearSelect])
    const updateTable=async()=>{
            if(name==""||number==""||cvc==""||expiry=="")
            {
              setErr("Please Fill All the Credentials!!!")
              setTimeout(() => {
                 setErr("");
              }, 5000);
              return;
            }
            else
            {
              setBtn("PLEASE WAIT...")
                  let s=localStorage.getItem('seats')
                  s=JSON.parse(s)
                  let data={
                    busId:id,
                    seats:s
                  }
                    await axios.post(`https://booking-app-backend-node-js-postgre-sqll.vercel.app/bus/update`,data)
                    .then((response)=>{
                      console.log("response for payment-->",response.data)
                      if(response.data.error==false)
                      {
                          setSuccess("SEAT BOOKING CONFIRMED. REDIRECTING....")
                          setTimeout(() => {
                              Navigate(`/home/${userid}`)
                          }, 3000);
                          
                      }
                    })
            }
        
    }
   return(
    <div className=''>
      <div className=''>
        <div className=''>
            <Cards
            cvc={cvc}
            expiry={expiry}
            focused={focused}
            name={name}
            number={number}
            />
        </div>
        <div className='d-flex' style={{justifyContent:'center',alignItems:'center',marginTop:30}}>
            <form className=''>
                <input 
                 className=''
                 placeholder='Card Number' 
                 type='number'
                 name="number" 
                 onChange={(e)=>{setNumber(e.target.value);}}
                 onFocus={(e)=>setFocused(e.target.name)}/>
                 <br/>
                 <br/>
                <input
                 className=''
                 placeholder='Holder Name' 
                 type='text'
                 name="name" 
                 onChange={(e)=>{setName(e.target.value)}}
                 onFocus={(e)=>setFocused(e.target.name)}/>
                 <br/>
                 <br/>
                <input
                 className=''
                 placeholder='CVC' 
                 type='number'
                 name="cvc" 
                 onChange={(e)=>{setCvc(e.target.value)}}
                 onFocus={(e)=>setFocused(e.target.name)}/>
                 <br/>
                 <br/>
                 <select
                 className=''
                 name="expiry"
                 onChange={(e)=>setExpiryMonthSelect(e.target.value)}
                 onFocus={(e)=>setFocused(e.target.name)}
                 >
                        {months.map((single)=><option>{single}</option>)}
                 </select>
                 <select
                 className=''
                 name="expiry"
                 onChange={(e)=>setExpiryYearSelect(e.target.value)}
                 onFocus={(e)=>setFocused(e.target.name)}
                   >
                       {year.map((single)=><option>20{single}</option>)}
                 </select>
                 <br/>
                 <br/>
                 <br/>
                 <div className='text-center'>
                   <a className='' style={{fontSize:14,color:'red',fontWeight:400}}>{err}</a>
                 </div>
                 <br/>
                 <br/>
                 <div className='text-center'>
                   <a className='btn btn-5' onClick={updateTable}>{btn}</a>
                 </div>
            </form>
        </div>
      </div>
    </div>
   )
}
export default CreditCard;