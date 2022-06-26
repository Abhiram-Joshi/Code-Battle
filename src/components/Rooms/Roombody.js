import "./roombody.css"; 
import { useNavigate } from "react-router-dom"; 
import img1 from "../../images/Group 74.svg";
import img2 from "../../images/Group 76.svg";
import img3 from "../../images/Group 75.svg";
import img_but from "../../images/Group 78.svg"; 

import socket from "../../utils/socket";
import cookie from "react-cookies"; 


const Room = () => { 

    const navigate = useNavigate();
    const category = cookie.load("category");  

    // const [difficulty, setDifficulty] = useState("");

    // useEffect(()=> {
    //   cookie.save("difficulty", difficulty, { path: "/" });  
    // },[difficulty])

  return (
    <div className="categories-body">
      <div>
        <h2 className="heading1 extra-bold">Rooms</h2> 
      </div>
      <div className="row">

      <div className="col-lg-3 level">
            <img className="card_img" variant="top" src={img1} alt="card-img"/>
            <div className="room-tag"><button className="no-border" onClick={async() => {
              // setDifficulty('no-sweat');
                cookie.save("difficulty", "no-sweat", { path: "/" });  
                await socket.emit("joinRoom",  {topic:category,difficulty:'no sweat'}, (response) => {console.log(response.stmt); 
                  localStorage.setItem('ques',response.stmt); 
                });
                navigate('/editor'); 
              }}>
                <h5>Easy</h5>
            </button></div>
        </div>
      <div className="col-lg-3 level">
            <img className="card_img" variant="top" src={img2} alt="card-img"/>
            <div className="room-tag"><button className="no-border" onClick={async() => {
              // setDifficulty('think different');
              cookie.save("difficulty", "think-different", { path: "/" });  
                await socket.emit("joinRoom", { query: {topic:category,difficulty:'think different'}}, (response) => {console.log(response.stmt); 
                  localStorage.setItem('ques',response.stmt); 
                });
                navigate('/editor'); 
              }}>
                <h5>Moderate</h5>
            </button></div>
        </div>
      <div className="col-lg-3 level">
            <img className="card_img" variant="top" src={img3} alt="card-img"/>
            <div className="room-tag"><button className="no-border" onClick={async() => {
              // setDifficulty('back-breaking');
              cookie.save("difficulty", "back-breaking", { path: "/" });  
                await socket.emit("joinRoom", { query: {topic:category,difficulty:'back-breaking'}}, (response) => {console.log(response.stmt); 
                  localStorage.setItem('ques',response.stmt); 
                });
                navigate('/editor'); 
              }} >
            <h5>Difficult</h5>
        </button></div>
       </div>

        <center><div className="pvt_button row ">
            <div className="col-lg-3">
                <img src={img_but} alt="card-img"/>
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
