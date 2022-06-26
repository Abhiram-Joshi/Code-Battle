import { useNavigate } from "react-router-dom";

import './signupBody.css'
import img5 from "../../../images/signupimg.svg";
import Form from "./FormFb"; 
import GButton from "./GButton";
 

const Signupbody = () => {

  const navigate = useNavigate();

    return(
        <div className="row signupbody">
            <div className="col-lg-5">
            <h2 className="login-heading extra-bold">Register Here</h2>
                 <Form />  
                 <GButton text="Signup with Gogle" className="google"/>
                 <div class="foot">
                    <h6>Already have an account ?<button className='mini-btn' onClick={() => navigate('/login')}><b><u>Login</u></b></button></h6>
                </div>
            </div>
            <div className="col-lg-7">
            <img src={img5} className=" " alt="timemator"/>
            </div>
        </div>
    )
}

export default Signupbody;