import { useNavigate } from "react-router-dom";

import './loginBody.css'
import img4 from "../../../images/loginimg.svg";
import Form from "./LoginFb";  
import GButton from "../../Signup/body/GButton";


const LoginBody = () => {

  const navigate = useNavigate();

    return(
        <div className="row loginBody">
            <div className="col-lg-5">
            <h2 className="login-heading extra-bold">Login</h2>
                <Form /> 
                <GButton text="Login with Google" className="google"/>  
                <div class="foot">
                    <h6>Don't have an account ?<button className='mini-btn' onClick={() => navigate('/signup')}><b><u>Sign Up</u></b></button></h6>
                </div>
            </div>
            <div className="col-lg-7">
            <img src={img4} className="login-image" alt="timemator"/>
            </div>
        </div>
    )
}

export default LoginBody;