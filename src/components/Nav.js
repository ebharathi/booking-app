import axios from "axios";
import { useEffect, useState } from "react";
const Navbar=({userId=1})=>{
    const [data,setData]=useState({});
    useEffect(()=>{
        async function getUser()
        {
            await axios.get(`${process.env.REACT_APP_BACKEND}/user/${userId}`)
            .then((resp)=>{
                console.log(resp,"rep");
                if(resp.data.error==false)
                 setData(resp.data.userData)
                localStorage.setItem('user_id',userId)
            })
        }
    getUser()
    },[])
    return(
        <nav className="" style={{backgroundColor:'#93adc6',padding:5}}>
           <div style={{display:'flex',justifyContent:'right'}}>
                <span style={{padding:'5px 10px',color:'grey'}}>
                  {data?.name?.toUpperCase()}
                </span>
           </div>
      </nav>
    )
}
export default Navbar;