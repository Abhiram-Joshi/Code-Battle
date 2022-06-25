import "./roombody.css"; 
import { useNavigate } from "react-router-dom";
import img1 from "../../images/Group 74.svg";
import img2 from "../../images/Group 76.svg";
import img3 from "../../images/Group 75.svg";
import img_but from "../../images/Group 78.svg"; 
import io from "socket.io-client";
import cookie from "react-cookies";
import { useState } from "react";


const Room = () => { 

    const navigate = useNavigate();

    const category = cookie.load("category"); 

    function joinroomeasy ()
    {   
        var c = io.connect('http://cea2-2401-4900-1c00-5b7-a53f-5f14-f559-f946.ngrok.io/', { query: 'category='+category+'&var2='+'easy'});
        navigate('/editor'); 
    }

    function joinroommoderate ()
    {   
        var c = io.connect('http://cea2-2401-4900-1c00-5b7-a53f-5f14-f559-f946.ngrok.io/', { query: 'category='+category+'&var2='+'moderate'});
        navigate('/editor'); 
    }

    function joinroomdifficult()
    {   
        var c = io.connect('http://cea2-2401-4900-1c00-5b7-a53f-5f14-f559-f946.ngrok.io/', { query: 'category='+category+'&var2='+'difficult'});
        navigate('/editor'); 
    }

  return (
    <div className="categories-body">
      <div>
        <h2 className="heading1 extra-bold">Rooms</h2> 
      </div>
      <div className="row">

      <div className="col-lg-3 level">
            <img className="card_img" variant="top" src={img1} />
            <div className="room-tag"><button className="no-border" onClick={joinroomeasy}>
                <h5>Easy</h5>
            </button></div>
        </div>
      <div className="col-lg-3 level">
            <img className="card_img" variant="top" src={img2} />
            <div className="room-tag"><button className="no-border" onClick={joinroommoderate}>
                <h5>Moderate</h5>
            </button></div>
        </div>
      <div className="col-lg-3 level">
            <img className="card_img" variant="top" src={img3} />
            <div className="room-tag"><button className="no-border" onClick={joinroomdifficult}>
            <h5>Difficult</h5>
        </button></div>
       </div>

        <center><div className="pvt_button row ">
            <div className="col-lg-3">
                <img src={img_but}/>
            </div>
            <div className="col-lg-9">
                <h4 className="pvt-btn-tag">Create Private Room</h4>
            </div>
        </div></center>
      </div>
    </div>
  );
};

export default Room;
