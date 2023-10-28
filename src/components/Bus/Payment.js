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
                      <div className="col-sm-2 col-md-3 col-lg-4"></div>
                      <div className="col-sm-8 col-md-5 col-lg-3 left p-2" style={{borderRadius:5}}>
                        <CreditCard/>
                      </div>
                      <div className="col-sm-2 col-md-3 col-lg-4"></div>
                  </div>
             </div>
        </div>
    )
}
export default Payment;