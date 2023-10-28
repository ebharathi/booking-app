import Navbar from "../Nav";
import CreditCard from "./CreditCard";
import { useParams } from "react-router-dom";

const Payment=()=>{
    const {userid,id}=useParams()
    return(
        <div>
             <Navbar userId={userid}/>
             <br/>
             <div className="bus-margin">
                  <div className="row">
                      <div className="col-4"></div>
                      <div className="col-3 left p-2" style={{borderRadius:5}}>
                        <CreditCard/>
                      </div>
                      <div className="col-4"></div>
                  </div>
             </div>
        </div>
    )
}
export default Payment;