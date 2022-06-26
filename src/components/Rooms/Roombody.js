import "./roombody.css"; 
import { useNavigate } from "react-router-dom";
import { useState , useEffect } from "react";
import img1 from "../../images/Group 74.svg";
import img2 from "../../images/Group 76.svg";
import img3 from "../../images/Group 75.svg";
import img_but from "../../images/Group 78.svg"; 
import io from "socket.io-client";
import cookie from "react-cookies"; 


const Room = () => { 

    const navigate = useNavigate();
    const category = cookie.load("category");  

    const [ques, setQues] = useState("");

    let initialRender = true;

    useEffect(() => {
      // if(initialRender){
      //   initialRender = false;
      // } else{
      //   // cookie.save("ques", ques, { path: "/" });
      //   console.log(ques);
      // }
      // localStorage.setItem('ques',ques);
        // cookie.save("ques", ques, { path: "/" });
    }, [ques]);

    // function joinroomeasy()
    // {   
    //     var socket = io.connect('http://885f-2401-4900-1c00-5b7-cd65-c6e2-c250-abb.ngrok.io/', { query: 'category='+category+'&var2='+'no sweat'});
    //     socket.emit("joinRoom");
    //     navigate('/editor'); 
    // }

    // function joinroommoderate()
    // {   
    //     var socket = io.connect('http://885f-2401-4900-1c00-5b7-cd65-c6e2-c250-abb.ngrok.io/', { query: 'category='+category+'&var2='+'think different'});
    //     socket.emit("joinRoom");
    //     navigate('/editor'); 
    // }

    // function joinroomdifficult()
    // {   
    //     var socket = io.connect('http://885f-2401-4900-1c00-5b7-cd65-c6e2-c250-abb.ngrok.io/', { query: {topic:category,difficulty:'back-breaking'}});
    //     socket.emit("joinRoom");
    //     navigate('/editor'); 
    // }

  return (
    <div className="categories-body">
      <div>
        <h2 className="heading1 extra-bold">Rooms</h2> 
      </div>
      <div className="row">

      <div className="col-lg-3 level">
            <img className="card_img" variant="top" src={img1} />
            <div className="room-tag"><button className="no-border" onClick={async() => {
                var socket = io.connect('http://f14d-2401-4900-1c00-5b7-c8d0-5480-8ab8-8d91.ngrok.io/', { query: {topic:category,difficulty:'no sweat'}});
                await socket.emit("joinRoom", (response) => {console.log(response.stmt); 
                  localStorage.setItem('ques',response.stmt); 
                });
                navigate('/editor'); 
              }}>
                <h5>Easy</h5>
            </button></div>
        </div>
      <div className="col-lg-3 level">
            <img className="card_img" variant="top" src={img2} />
            <div className="room-tag"><button className="no-border" >
                <h5>Moderate</h5>
            </button></div>
        </div>
      <div className="col-lg-3 level">
            <img className="card_img" variant="top" src={img3} />
            <div className="room-tag"><button className="no-border"  >
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
