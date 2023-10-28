import axios from "axios";
import { useEffect, useState } from "react";

const Navbar=()=>{
    const [data,setData]=useState({});
    useEffect(()=>{
        async function getUser()
        {
            await axios.get(`http://localhost:9000/user/${3}`)
            .then((resp)=>{
                console.log(resp,"rep");
                if(resp.data.error==false)
                 setData(resp.data.userData)
            })
        }
    getUser()
    },[])
    return(
        <nav className="" style={{backgroundColor:'#93adc6',padding:5}}>
           <div style={{display:'flex',justifyContent:'right'}}>
                <span style={{padding:'5px 10px',color:'grey'}}>
                  {data?.name.toUpperCase()}
                </span>
           </div>
      </nav>
    )
}
export default Navbar;