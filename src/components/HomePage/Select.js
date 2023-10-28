import axios from "axios";
import { useEffect, useState } from "react";

const Select=()=>{
    const [data,setData]=useState([]);
    useEffect(()=>{
        async function get(){
            await axios.get('http://localhost:9000/bus')
            .then(res=>{
                if(res.data.error==false)
                  {
                    console.log("res-->",res.data.data)
                    setData(res?.data?.data)   
                  }
                  else
                  {
                    console.log("error in getting data of buses");
                  }
            })

        }
        get()
    },[])
    return (
        <div>
            <div className="row">
                {
                    data.map((single)=>
                        <div className="col-sm-3 p-4">
                            <div className="card" style={{backgroundColor: "rgba(255, 255, 255, 0.5)"}}>
                            <div className="card-body">
                                <h5 className="card-title">{single.name}</h5>
                                <h6 className="card-title">{single.origin} - {single.dest}</h6>
                                <span className="" style={{padding:'0px !important',margin:'0px !important'}}>{single?.departuredate}</span>
                                <br/>
                                <span className="">{single?.departuretime}</span>
                                <br/>
                                <a href={`/bus/${single.id}`} className="btn btn-5 text-white">Book</a>
                            </div>
                            </div>
                        </div>
                    
                    )
                }
            </div>
            
        </div>
    )
}
export default Select;