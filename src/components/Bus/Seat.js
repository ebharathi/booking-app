import { useEffect, useState } from "react";

const Seat=({onClick,data,selectedSeats})=>{
    console.log("sajajksjaksjksks",selectedSeats)
    const [on,setOn]=useState(false);
    useEffect(()=>{
        let found=false;
        selectedSeats.map((s)=>{
            if(s.name==data?.name)
            {
                console.log("ppp",s)
                setOn(true);
                found=true;
            }
        })
        if(found==false)
          setOn(false)
    },[selectedSeats])
    return (
        <div className="col-4 seat">
          <div className={data.isselected?'selected disabled-element ':on?'now-selected':''} onClick={()=>onClick(data?.id)}>
            {data?.name}
         </div> 
        </div>
    )
}
export default Seat;