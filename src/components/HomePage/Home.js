import Navbar from "../Nav";
import Select from "./Select";
import { useParams } from "react-router-dom";
const Home=()=>{
    const {userid}=useParams()
    return (
        <div>
            <Navbar userId={userid}/>
            <br/>
            <Select/>
        </div>
    )
}
export default Home;