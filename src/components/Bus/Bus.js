import { useEffect, useState } from "react";
import Navbar from "../Nav";
import Seat from "./Seat";
import Choose from "./Choose";
import './bus.css'
import axios from "axios";
import { useParams,useNavigate } from "react-router-dom";
const Bus=()=>{
    const Navigate=useNavigate()
    const [data,setData]=useState({})
    const [seats,setSeats]=useState([])
    const [selectedSeats,setSelectedSeats]=useState([])
    const [error,setError]=useState("");
    const [btn,setBtn]=useState("BOOK")
    let {id,userid}=useParams()
    useEffect(()=>{
        async function get(){
            await axios.get('http://localhost:9000/bus')
            .then(res=>{
                if(res.data.error==false)
                  {
                    console.log("res for bus data-->",res.data.data)
                    res?.data?.data.map((s)=>{
                        if(s.id==id)
                        {
                            setData(s) 
                            console.log("bus found",s);
                        }
                    })
                  }
                  else
                  {
                    console.log("error in getting data of buses");
                  }
            })

        }
        get()
        async function getSeats()
        {
            await axios.get(`http://localhost:9000/bus/seat/${id}`)
            .then((res)=>{
                console.log("resp for seats",res.data);
                if(res.data.error==false)
                    setSeats(res.data.data);
                else
                 console.log("ERR in getting seats");
            })
        }
        getSeats()
    },[])
    const addSelectedSeats=(id)=>{
         console.log("selected---?",id);
            console.log("alread-->",selectedSeats)
         setError("");
         const newSeat = seats[id-1];
         const selectedSeatsSet = new Set(selectedSeats);
         selectedSeatsSet.add(newSeat);
         const updatedSelectedSeats = Array.from(selectedSeatsSet);
         console.log("updated seats---?",updatedSelectedSeats)
         if(updatedSelectedSeats.length<=20)
          setSelectedSeats(updatedSelectedSeats);
        else
            setError("Maximum seats selected!!!!")
    }
    const removeSelectedSeats=(id)=>{
        setError("");
            console.log("d---",id);
            setSelectedSeats(selectedSeats.filter(item=>item?.id!=id))
    }
    const bookSeat=async()=>{
        setError(" ");
        setBtn("PLEASE WAIT..")
        console.log("[+]Booking called");
        if(selectedSeats.length==0)
         {
             setBtn("BOOK")
             setError("Please select atleast one seat!!")
             return;
         } 
         else
         {
             localStorage.setItem("seats",JSON.stringify(selectedSeats));
             setTimeout(() => {
                 Navigate(`/user/${userid}/payment/${id}`)
             }, 2000);
         }
    }
    return (
        <div>
            <Navbar userId={userid}/>
            <br/>
            <div className="bus-margin">
                  <div className="row">
                          <div className="aa col-sm-0 col-md-1 col-lg-3" ></div>
                          <div className="col-6 col-sm-6 col-md-5 col-lg-3 left row " style={{padding:'50px 0px'}} >
                                { 
                                    seats.map((s)=>
                                     <Seat onClick={addSelectedSeats} selectedSeats={selectedSeats} data={s}/>
                                    )
                                 }
                          </div>
                          <div className="col-6 col-sm-6 col-md-5 col-lg-3 left p-5" >
                              <span className="bus-title">
                                {data?.name?.toUpperCase()}
                              </span>
                              <br/>
                              <span className="" style={{fontSize:12}}>
                                {data?.origin?.toUpperCase()+" -> "+data?.dest?.toUpperCase()}
                              </span>
                              
                              <br/>
                              <span style={{fontSize:13}}>
                                *selected ({selectedSeats.length})
                              </span>
                              <div className="row">
                                {
                                    selectedSeats.map((s)=>
                                    <Choose data={s} onClick={removeSelectedSeats}/>
                                    )
                                }
                              </div>
                              <span style={{color:'red',fontSize:12}}>
                                {error}
                              </span>
                              <br/>
                              <br/>
                              <br/>
                              <button className="btn btn-13" onClick={bookSeat}>{btn}</button>
                           </div>
                          <div className="aa col-0 col-md-1 col-lg-3"  ></div>
                  </div>
            </div>
        </div>
    )
}
export default Bus;